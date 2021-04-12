import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';
import { ValueIsExist } from './validators/valueIsExist';
@Module({
  providers: [PrismaService, ValueIsExist],
  exports: [PrismaService, ValueIsExist],
})
export class SharedModule {}
