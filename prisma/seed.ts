import { PrismaClient, Permission, Role } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const permissions: Permission[] = [
    { id: 1, resource: 'permission', attributes: '*', action: 'create:any' },
    { id: 2, resource: 'permission', attributes: '*', action: 'read:any' },
    { id: 3, resource: 'permission', attributes: '*', action: 'update:any' },
    { id: 4, resource: 'permission', attributes: '*', action: 'delete:any' },
    { id: 5, resource: 'role', attributes: '*', action: 'create:any' },
    { id: 6, resource: 'role', attributes: '*', action: 'read:any' },
    { id: 7, resource: 'role', attributes: '*', action: 'update:any' },
    { id: 8, resource: 'role', attributes: '*', action: 'delete:any' },
    { id: 9, resource: 'user', attributes: '*', action: 'create:any' },
    { id: 10, resource: 'user', attributes: '*', action: 'read:any' },
    { id: 12, resource: 'user', attributes: '*', action: 'update:any' },
    { id: 13, resource: 'user', attributes: '*', action: 'delete:any' },
    { id: 14, resource: 'user', attributes: '*', action: 'update:own' },
    { id: 15, resource: 'user', attributes: '*', action: 'delete:own' },
  ];
  
  await prisma.permission.createMany({ data: permissions });
  await prisma.role.create({
    data: {
      name: 'account',
      permissions: { connect: [{ id: 14 }, { id: 15 }] },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
