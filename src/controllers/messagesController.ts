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

@Route('messages')
export class MessagesController extends Controller {
  prisma = new PrismaClient();

  /**
   * @summary 指定したチャット内の全てのメッサージを取得
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
}
