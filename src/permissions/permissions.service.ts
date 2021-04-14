import { prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionEntity, UniqueField } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}
  create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionEntity> {
    return this.prisma.permission.create({ data: createPermissionDto });
  }

  findAll(): Promise<PermissionEntity[]> {
    return this.prisma.permission.findMany();
  }

  findOne(where: Where<UniqueField>): Promise<PermissionEntity> {
    return this.prisma.permission.findUnique({ where });
  }

  update(
    where: Where<UniqueField>,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<PermissionEntity> {
    return this.prisma.permission.update({ where, data: updatePermissionDto });
  }

  remove(where: Where<UniqueField>): Promise<PermissionEntity> {
    return this.prisma.permission.delete({ where });
  }
}
