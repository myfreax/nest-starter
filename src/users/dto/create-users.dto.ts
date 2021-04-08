import { UserEntity } from '../entities/user.entity';
import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateUsersDto extends OmitType(UserEntity, ['id'] as const) {
  email: string;
  password: string;
  roleId: number;
}
