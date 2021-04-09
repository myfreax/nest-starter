import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';
import { RoleIdIsExist } from './validators/roleIdIsExist';

@Module({
  providers: [PrismaService, RoleIdIsExist],
  exports: [PrismaService, RoleIdIsExist],
})
export class SharedModule {}
