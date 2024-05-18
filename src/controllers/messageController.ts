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

export interface ResponseType {
  message: string;
}

@Route('message')
export class MessageController extends Controller {
  prisma = new PrismaClient();

  /**
   * @summary 指定したIDのメッセージを取得
   * @param messageId 対象のメッセージId
   */
  @Get('{messageId}')
  @Tags('Message')
  public async getMessage(@Path() messageId: number, @Query() name?: string) {
    const user = { id: 1, name: 'puuko' };
    return user;
  }

  /**
   * @summary メッセージの作成
   */
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('/')
  @Tags('Message')
  public async createMessage(): Promise<void> {
    this.setStatus(201); // set return status 201
    return;
  }
}
