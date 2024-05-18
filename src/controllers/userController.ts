import { Controller, Get, Path, Post, Query, Route, SuccessResponse, Tags } from 'tsoa/dist/index';
import { User } from '@/types';
import { PrismaClient } from '@prisma/client';

@Route('user')
@Tags('User')
export class UsersController extends Controller {
  /**
   * @summary 指定したIDのユーザー情報を取得
   */
  @Get('{userId}')
  public async getUser(@Path() userId: number): Promise<User | null> {
    const prisma = new PrismaClient();
    const user: User | null = await prisma.user.findFirst({
      where: { id: userId },
    });
    return user;
  }

  /**
   * @summary ユーザーの作成
   */
  @SuccessResponse('201', 'Created') // Custom success responsea
  @Post()
  public async createUser() {
    this.setStatus(201); // set return status 201
    return;
  }
}
