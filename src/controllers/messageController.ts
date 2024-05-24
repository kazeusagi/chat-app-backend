import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa/dist/index';
import { Chat, PrismaClient } from '@prisma/client';
import { SampleType } from '@kazeusagi/chat-app-types';

export interface ResponseType {
  message: string;
}

@Route('message')
export class MessageController extends Controller {
  prisma = new PrismaClient();

  /**
   * 指定したチャット内の全てのメッサージを取得
   * @summary メッセージ一覧取得
   * @param chatId 対象のチャットId
   */
  @Get('{chatId}')
  @Tags('Message')
  public async getMessages(@Path() chatId: number) {
    const user = await this.prisma.user.findFirst({
      where: { id: chatId },
      include: { joinedChats: true },
    });
    return user?.joinedChats;
  }

  /**
   * 指定したチャットの指定したIDのメッセージを取得
   * @summary メッセージ単体取得
   * @param chatId 対象のチャットId
   * @param messageId 対象のメッセージId
   */
  @Get('{chatId}/{messageId}')
  @Tags('Message')
  public async getMessage(@Path() chatId: number, @Path() messageId: number) {
    const user = { id: 1, name: 'puuko' };
    return user;
  }
}
