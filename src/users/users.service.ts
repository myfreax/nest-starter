import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * find user by UserEntity unique key
   * @param where
   * @returns UserEntity | null
   */
  async findOne(where: Condition<UserEntity>): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({ where });
  }
  
  /**
   * create user
   * @param createUserDto CreateUsersDto
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
   * @returns
   */
  async update(id: number, updateUserDto: UpdateUsersDto): Promise<UserEntity> {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  /**
   * delete user by id
   * @param id
   * @returns
   */
  async remove(id: number): Promise<UserEntity> {
    return this.prisma.user.delete({ where: { id } });
  }
}
