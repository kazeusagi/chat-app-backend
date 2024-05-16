import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse } from 'tsoa/dist/index';
import { Chat, PrismaClient } from '@prisma/client';

@Route('chats')
export class ChatsController extends Controller {
  prisma = new PrismaClient();

  /**
   * @summary チャット一覧の取得
   */
  @Get('{userId}')
  public async getChats(@Path() userId: number) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      include: { joinedChats: true },
    });
    return user?.joinedChats;
  }
}
