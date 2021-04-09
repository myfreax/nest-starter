import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UniqueField, UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * find user by UserEntity unique index field
   * @param where UniqueField
   * @returns UserEntity | null
   */
  async findOne(where: Where<UniqueField>): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({ where });
  }

  /**
   * create user
   * @param CreateUsersDto
   * @returns UserEntity | null
   */
  async create(createUserDto: CreateUsersDto): Promise<UserEntity | null> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  /**
   * findAll users
   * @returns UserEntity[] | null
   */
  async findAll(): Promise<UserEntity[] | null> {
    return this.prisma.user.findMany();
  }

  /**
   * update user by id
   * @param id number
   * @param updateUserDto UpdateUsersDto
   * @returns UserEntity
   */
  async update(
    where: Where<UniqueField>,
    updateUserDto: UpdateUsersDto,
  ): Promise<UserEntity> {
    return this.prisma.user.update({ where, data: updateUserDto });
  }

  /**
   * delete user by unique index field
   * @param where UniqueField
   * @returns UserEntity
   */
  async remove(where: Where<UniqueField>): Promise<UserEntity> {
    return this.prisma.user.delete({ where });
  }
}
