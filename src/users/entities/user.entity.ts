import { User } from '@prisma/client';
import { IsString, MinLength, MaxLength,IsEmail,IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @ApiProperty()
  @Type(() => Number)
  roleId: number;
}
