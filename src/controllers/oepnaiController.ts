import {
  Body,
  Controller,
  Example,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa/dist/index';
import { Prisma, PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import { RoleEnum, getRoleName } from '@/types';

type askProps = {
  chatId?: number;
  userMessage: string;
  systemMessage?: string;
};

@Route('openai')
export class OpenAiController extends Controller {
  prisma = new PrismaClient();
  openai = new OpenAI();

  /**
   * OpenAIに質問のリクエストを送信
   * @summary 質問リクエスト送信
   * @returns askReturn
   */
  @Tags('OpenAI')
  @Post('ask')
  public async postAsk(@Body() { userMessage, systemMessage, chatId }: askProps): Promise<string> {
    // chatIdが無ければ新規作成
    if (chatId == null) {
      chatId = (await this.prisma.chat.create({ data: { name: '新規' } })).id;
    }
    // chatの取得
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        messages: { include: { user: { include: { role: true } } } }, // ユーザーのロール情報も取得
      },
    });
    if (chat == null) throw new Error(`chatId: ${chatId} のチャットが見つかりませんでした。`);

    // paramの作成
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];
    // systemMessageがあったら追加
    if (systemMessage) {
      messages.push({ role: getRoleName(RoleEnum.system), content: systemMessage });
    }
    // 履歴があれば追加
    if (chat && chat.messages.length > 0) {
      messages.push(
        ...chat.messages.map((message) => ({
          role: message.user.role.name,
          content: message.content,
        })),
      );
    }
    // ユーザーメッセージを追加
    messages.push({ role: getRoleName(RoleEnum.user), content: userMessage });

    // OpenAIにリクエスト送信
    const response = await this.openai.chat.completions.create({
      messages,
      model: 'gpt-3.5-turbo',
    });

    // 返答メッセージ
    const assistantMessage = response.choices[0].message.content;
    if (assistantMessage == null) return '返信がありませんでした。再読込を行ってください。';

    // messageの保存
    const data: Prisma.MessageCreateManyInput[] = [];
    if (systemMessage) data.push({ content: systemMessage, userId: 2, chatId: chatId });
    data.push(
      ...[
        {
          content: userMessage,
          userId: 2,
          chatId: chatId,
        },
        {
          content: assistantMessage,
          userId: 2,
          chatId: chatId,
        },
      ],
    );
    await this.prisma.message.createMany({ data });

    return assistantMessage;
  }
}
