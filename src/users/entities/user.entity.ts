import { PrismaClient, User } from '@prisma/client';
import {
  ValidationOptions,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Min,
  IsInt,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IdDto } from '../../shared/dto/id-dto';
import { IsExist } from '../../shared/decorators/isExist-decorator';
import { RoleEntity } from '../../roles/entities/role.entity';
export class UserEntity extends IdDto implements PropertyOption<User> {
  @ApiProperty({ example: 'web@myfreax.com' })
  @Type(() => String)
  @Expose()
  email?: string;

  @ApiProperty({
    example: 'randompassword',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Expose()
  password?: string;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @Expose()
  @Min(1)
  @IsInt()
  @IsExist<RoleEntity>({ findInTable: 'role', mapUniqueFieldName: 'id' })
  roleId?: number;
}

export class UniqueField extends IdDto implements PropertyOption<User> {
  email: string;
}
