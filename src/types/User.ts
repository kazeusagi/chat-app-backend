export type User = {
  id: number;
  name: string;
  roleId: number;
};

export enum UserEnum {
  system = 1,
  assistant = 2,
  user = 3,
}
