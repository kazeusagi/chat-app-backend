import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse } from 'tsoa/dist/index';
import { Chat, PrismaClient } from '@prisma/client';

export interface ResponseType {
  message: string;
}

@Route('message')
export class MessageController extends Controller {
  prisma = new PrismaClient();

  /**
   * @summary 単一メッセージの取得
   * @param messageId 対象のメッセージId
   */
  @Get('{messageId}')
  public async getMessage(@Path() messageId: number, @Query() name?: string) {
    const user = { id: 1, name: 'puuko' };
    return user;
  }

  /**
   * @summary 単一メッセージの作成
   */
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('/')
  public async createMessage(): Promise<void> {
    this.setStatus(201); // set return status 201
    return;
  }
}
