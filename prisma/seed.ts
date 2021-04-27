import {
  PrismaClient,
  PermissionAction,
  PermissionResource,
} from '@prisma/client';
import { CreatePermissionDto } from '../src/permissions/dto/create-permission.dto';
const prisma = new PrismaClient();

async function main() {
  const permissions: CreatePermissionDto[] = [
    {
      resource: PermissionResource.permission,
      attributes: '*',
      action: PermissionAction.create_any,
    },
    {
      resource: PermissionResource.permission,
      attributes: '*',
      action: PermissionAction.read_any,
    },
    {
      resource: PermissionResource.permission,
      attributes: '*',
      action: PermissionAction.update_any,
    },
    {
      resource: PermissionResource.permission,
      attributes: '*',
      action: PermissionAction.delete_any,
    },
    {
      resource: PermissionResource.role,
      attributes: '*',
      action: PermissionAction.create_any,
    },
    {
      resource: PermissionResource.role,
      attributes: '*',
      action: PermissionAction.read_any,
    },
    {
      resource: PermissionResource.role,
      attributes: '*',
      action: PermissionAction.update_any,
    },
    {
      resource: PermissionResource.role,
      attributes: '*',
      action: PermissionAction.delete_any,
    },
    {
      resource: PermissionResource.user,
      attributes: '*',
      action: PermissionAction.create_any,
    },
    {
      resource: PermissionResource.user,
      attributes: '*',
      action: PermissionAction.read_any,
    },
    {
      resource: PermissionResource.user,
      attributes: '*',
      action: PermissionAction.update_any,
    },
    {
      resource: PermissionResource.user,
      attributes: '*',
      action: PermissionAction.delete_any,
    },
    {
      resource: PermissionResource.user,
      attributes: '*',
      action: PermissionAction.update_own,
    },
    {
      resource: PermissionResource.user,
      attributes: '*',
      action: PermissionAction.delete_own,
    },
  ];

  await prisma.permission.createMany({ data: permissions });
  await prisma.role.create({
    data: {
      name: 'account',
      permissions: { connect: [{ id: 13 }, { id: 14 }] },
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
