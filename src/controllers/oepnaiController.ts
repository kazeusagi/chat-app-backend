import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse } from 'tsoa/dist/index';
import { Chat, PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

type askProps = {
  prompt: string;
};

@Route('openai')
export class OpenAiController extends Controller {
  prisma = new PrismaClient();
  openai = new OpenAI();

  /**
   * @summary OpenAIにリクエスト送信
   * @returns ChatCompletion
   */
  @Post('ask')
  public async postAsk(@Body() { prompt }: askProps) {
    const response = this.openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-3.5-turbo',
    });
    return response;
  }
}
