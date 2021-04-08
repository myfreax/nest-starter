import { User } from '@prisma/client';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsInt,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements PropertyOption<User> {
  @ApiProperty()
  @IsInt()
  @Expose()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Expose()
  password?: string;

  @ApiProperty()
  @Type(() => Number)
  @Expose()
  roleId?: number;
}
