import { RoleEnumType, RoleEnum } from '@/types';
import { PrismaClient, Role } from '@prisma/client';

// roleの初期データ投入
export async function role(prisma: PrismaClient) {
  const roles: Role[] = Object.entries(RoleEnum).map(([key, value]) => ({
    id: value,
    name: key as RoleEnumType,
  }));

  await prisma.role.createMany({ data: roles });
}
