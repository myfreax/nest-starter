import { UserEntity, Email } from '../entities/user.entity';
import { OmitType } from '@nestjs/swagger';
import { IsExist } from '../../shared/decorators/isExist-decorator';

export class CreateUsersDto extends OmitType(UserEntity, ['id'] as const) {
  /**
   * create user when user is not exist
   */
  @Email()
  @IsExist({ findInTable: 'user', opposite: true })
  email: string;

  password: string;

  /**
   * roleId require already exist
   */
  roleId: number;
}
