import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  /**
   * find user by username
   * @param where
   * @returns UserEntity | null
   */
  async findOne(where: Condition<UserEntity>): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({ where });
  }
}
