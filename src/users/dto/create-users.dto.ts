import { UserEntity } from '../entities/user.entity';
import { Expose, Type } from 'class-transformer';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreateUsersDto implements Omit<UserEntity, 'id'> {
  @Expose()
  email: string;

  @Expose()
  password: string;

  @Expose()
  @IsOptional()
  roleId: number;
}
