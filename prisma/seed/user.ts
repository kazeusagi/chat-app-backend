import { RoleEnum } from '@/types';
import { PrismaClient, User } from '@prisma/client';

// userの初期データ投入
export async function user(prisma: PrismaClient) {
  const users: User[] = [
    {
      id: 1,
      name: 'system',
      roleId: RoleEnum.system,
    },
    {
      id: 2,
      name: 'player',
      roleId: RoleEnum.user,
    },
    {
      id: 3,
      name: 'assistant',
      roleId: RoleEnum.assistant,
    },
  ];

  await prisma.user.createMany({ data: users });
}
