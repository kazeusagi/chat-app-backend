import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // roleの初期化
  const roles = [
    { id: 1, name: 'user' },
    { id: 2, name: 'assistant' },
    { id: 3, name: 'system' },
  ];
  roles.forEach(async (role) => {
    await prisma.role.upsert({
      where: { id: role.id },
      update: {},
      create: role,
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
