import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { UserEntity } from '../../users/entities/user.entity';

export class LoginDto extends UserEntity {
  @IsEmail()
  @Expose()
  email: string;

  @Expose()
  password: string;
}
