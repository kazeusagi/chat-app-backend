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
   * @returns ChatCompletion
   */
  @Tags('OpenAI')
  @Post('ask')
  public async postAsk(@Body() body: askProps) {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];
    // systemMessageがあったら追加
    if (body.systemMessage) {
      messages.push({ role: getRoleName(RoleEnum.system), content: body.systemMessage });
    }
    // 履歴があれば追加
    const chat = await this.prisma.chat.findUnique({
      where: { id: body.chatId },
      include: {
        messages: { include: { user: { include: { role: true } } } }, // ユーザーのロール情報も取得
      },
    });
    if (chat && chat.messages.length > 0) {
      messages.push(
        ...chat.messages.map((message) => ({
          role: message.user.role.name,
          content: message.content,
        })),
      );
    }
    // ユーザーメッセージを追加
    messages.push({ role: getRoleName(RoleEnum.user), content: body.userMessage });

    // OpenAIにリクエスト送信
    const response = await this.openai.chat.completions.create({
      messages,
      model: 'gpt-3.5-turbo',
    });

    // 返答メッセージ
    const assistantMessage = response.choices[0].message.content;
    if (assistantMessage == null) return '返信がありませんでした。再読込を行ってください。';

    // DBに保存
    // chatが無い場合は新規作成
    if (body.chatId == null || chat == null) {
      body.chatId = (await this.prisma.chat.create({ data: { name: '新規' } })).id;
    }
    // assistantMessageの保存
    const a: Prisma.MessageCreateInput = {
      content: assistantMessage,
      user: { connect: { id: 1 } },
      chat: { connect: { id: body.chatId } },
    };
    const b = await this.prisma.message.create({ data: a });

    return assistantMessage;
  }
}
