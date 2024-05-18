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

@Route('chats')
export class ChatsController extends Controller {
  prisma = new PrismaClient();

  /**
   * @summary 指定したユーザーの全てのチャット一覧を取得
   */
  @Get('{userId}')
  @Tags('Chat')
  public async getChats(@Path() userId: number) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      include: { joinedChats: true },
    });
    return user?.joinedChats;
  }
}
