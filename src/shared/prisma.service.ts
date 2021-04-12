import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export type Tables = Exclude<
  keyof PrismaClient,
  | '$connect'
  | '$disconnect'
  | '$use'
  | '$on'
  | '$queryRaw'
  | '$executeRaw'
  | '$transaction'
>;

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit {
  async onModuleDestroy() {
    await this.$disconnect();
  }
  async onModuleInit() {
    await this.$connect();
  }
}
