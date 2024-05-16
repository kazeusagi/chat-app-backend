import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse } from 'tsoa/dist/index';
import { RoleEnumType } from '@/types';
import { Chat, PrismaClient } from '@prisma/client';

@Route('chat')
export class ChatController extends Controller {
  prisma = new PrismaClient();

  /**
   * @summary 単一チャットの取得
   * @param chatId 対象のチャットId
   */
  @Get('{chatId}')
  public async getChat(@Path() chatId: number) {
    const chat = await this.prisma.chat.findUnique({ where: { id: chatId } });
    return chat;
  }

  /**
   * @summary 単一チャットの作成
   */
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('/')
  public async createChat(): Promise<void> {
    this.setStatus(201); // set return status 201
    return;
  }
}
