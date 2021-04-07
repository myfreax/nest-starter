import { UserEntity } from '../entities/user.entity';
import { Expose, Type } from 'class-transformer';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class UpdateUsersDto implements Omit<UserEntity, 'id'> {
    @Expose()
    email: string;
  
    @Expose()
    password: string;
  
    @Expose() 
    roleId: number;
  }
  