import { RoleEnum as prismaRoleEnum } from '@prisma/client';

// prismaで定義したenumには値を付与できないので、ここで値を付与する
export const RoleEnum: { [key in prismaRoleEnum]: number } = {
  system: 1,
  user: 2,
  assistant: 3,
};

export type RoleEnumType = keyof typeof RoleEnum;

export function getRoleName(roleId: number): RoleEnumType {
  return Object.keys(RoleEnum).find(
    (key) => RoleEnum[key as RoleEnumType] === roleId,
  ) as RoleEnumType;
}
