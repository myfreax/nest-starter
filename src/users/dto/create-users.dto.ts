import { UserEntity } from '../entities/user.entity';
import { Expose, Type } from 'class-transformer';
import { IsEmail, IsString, Validate, Validator } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsExist } from '../../shared/decorators/isExist-decorator';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { ValueIsExist } from '../../shared/validators/valueIsExist';

export class CreateUsersDto extends OmitType(UserEntity, ['id'] as const) {
  /**
   * create user when user is not exist
   */
  // TODO how reuse those Validator
  @IsString()
  @IsEmail()
  @IsExist({ findInTable: 'user', opposite: true })
  email: string;

  password: string;

  /**
   * roleId require already exist
   */
  roleId: number;
}
