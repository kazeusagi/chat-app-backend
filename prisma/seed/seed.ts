import { PrismaClient } from '@prisma/client';
import { role } from './role';
import { user } from './user';
import { Controller } from 'tsoa/dist/index';

const prisma = new PrismaClient();

async function main() {
  // 既存データ削除
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  // 初期データ投入
  await role(prisma);
  await user(prisma);
}

main()
  .catch(async (e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export class UsersController extends Controller {}
