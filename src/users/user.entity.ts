import { User } from '@prisma/client';
import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UserEntity implements User {
  id: number;
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  password: string;
  roleId: number;
}
