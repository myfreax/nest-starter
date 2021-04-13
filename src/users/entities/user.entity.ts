import { User } from '@prisma/client';
import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IdDto, ID } from '../../shared/dto/id-dto';
import { IsExist } from '../../shared/decorators/isExist-decorator';
import { RoleEntity } from '../../roles/entities/role.entity';
import { applyDecorators } from '@nestjs/common';
export function Email() {
  return applyDecorators(
    ApiProperty({ example: 'web myfreax.com' }),
    Type(() => String),
    Expose(),
    IsString(),
    IsEmail(),
  );
}
export class UserEntity extends IdDto implements PropertyOption<User> {
  @Email()
  email?: string;

  @ApiProperty({
    example: 'randompassword',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Expose()
  password?: string;

  @ID()
  @IsExist<RoleEntity>({ findInTable: 'role', mapUniqueFieldName: 'id' })
  roleId?: number;
}

export class CheckIdDto extends IdDto {
  @ID()
  @IsExist({ findInTable: 'user' })
  id: number;
}

export class UniqueField extends IdDto implements PropertyOption<User> {
  email: string;
}
