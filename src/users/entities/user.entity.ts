import { User } from '@prisma/client';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Min,
  IsInt,
  Validate
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IdDto } from '../../shared/dto/id-dto';
import { RoleIdIsExist } from '../../shared/validators/roleIdIsExist';

export class UserEntity extends IdDto implements PropertyOption<User> {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @Expose()
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
  @Min(1)
  @IsInt()
  @Validate(RoleIdIsExist)
  roleId?: number;
}

export class UniqueField extends IdDto implements PropertyOption<User> {
  email: string;
}
