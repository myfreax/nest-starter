import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';
import { ValueIsExist } from './validators/exist';
@Module({
  providers: [PrismaService, ValueIsExist],
  exports: [PrismaService, ValueIsExist],
})
export class SharedModule {}
