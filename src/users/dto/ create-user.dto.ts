import { UserEntity } from '../user.entity';
import { Expose, Type } from 'class-transformer';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto implements Partial<UserEntity> {
  @IsString()
  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @MinLength(8)
  @Expose()
  password: string;

  @Expose()
  @Type(() => Number)
  roleId: number;
}
