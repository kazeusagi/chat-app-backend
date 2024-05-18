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
   * @summary 指定したIDのチャット情報を取得
   * @param chatId 対象のチャットId
   */
  @Get('{chatId}')
  @Tags('Chat')
  public async getChat(@Path() chatId: number) {
    const chat = await this.prisma.chat.findUnique({ where: { id: chatId } });
    return chat;
  }

  /**
   * @summary チャットの作成
   */
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('/')
  @Tags('Chat')
  public async createChat(): Promise<void> {
    this.setStatus(201); // set return status 201
    return;
  }
}
