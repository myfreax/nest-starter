import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}
  create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    return this.prisma.role.create({ data: createRoleDto });
  }

  findAll(): Promise<RoleEntity[]> {
    return this.prisma.role.findMany();
  }

  findOne(where: Where<RoleEntity>): Promise<RoleEntity> {
    return this.prisma.role.findUnique({ where });
  }

  update(
    where: Where<RoleEntity>,
    updateRoleDto: UpdateRoleDto,
  ): Promise<RoleEntity> {
    return this.prisma.role.update({ where, data: updateRoleDto });
  }

  remove(where: Where<RoleEntity>): Promise<RoleEntity> {
    return this.prisma.role.delete({ where });
  }
}
