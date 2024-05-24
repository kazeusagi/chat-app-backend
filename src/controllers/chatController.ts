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
import { RoleEnumType } from '@/types';
import { Chat, PrismaClient } from '@prisma/client';
@Route('chat')
export class ChatController extends Controller {
  prisma = new PrismaClient();

  /**
   * 指定したユーザーの全てのチャット一覧を取得
   * @summary チャット一覧取得
   * @param chatId 対象のユーザーId
   */
  @Get('{userId}')
  @Tags('Chat')
  public async getChats(@Path() userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { joinedChats: true },
    });
    const chats = user?.joinedChats;
    return chats;
  }

  /**
   * 指定したユーザーの指定したIDのチャット情報を取得
   * @summary チャット単体取得
   * @param chatId 対象のユーザーId
   * @param chatId 対象のチャットId
   */
  @Get('{userId}/{chatId}')
  @Tags('Chat')
  public async getChat(@Path() userId: number, @Path() chatId: number) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId, members: { some: { id: userId } } },
      include: { messages: true },
    });
    return chat;
  }
}
