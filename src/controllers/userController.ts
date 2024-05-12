import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse } from 'tsoa/dist/index';
import { RoleEnumType } from '@/types';

@Route('chats')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(@Path() userId: number, @Query() name?: string) {
    const a: RoleEnumType = 'assistant';
    const user = { id: 1, name: 'puukosdadas' };
    return user;
  }

  @SuccessResponse('201', 'Created') // Custom success responsea
  @Post()
  public async createUser(): Promise<void> {
    this.setStatus(201); // set return status 201
    return;
  }
}
