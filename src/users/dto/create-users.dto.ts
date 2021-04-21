import { UserEntity, Email } from '../entities/user.entity';
import { OmitType } from '@nestjs/swagger';
import { IsNotExist } from '../../shared/validators/exist';

export class CreateUsersDto extends OmitType(UserEntity, ['id'] as const) {
  /**
   * create user when user is not exist
   */
  @Email()
  @IsNotExist({ table: 'user' })
  email: string;

  password: string;

  /**
   * roleId require already exist
   */
  roleId: number;
}
