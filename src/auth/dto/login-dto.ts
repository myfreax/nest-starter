import { Expose } from 'class-transformer';
import { UserEntity } from '../../users/entities/user.entity';

export class LoginDto extends UserEntity {
  @Expose()
  username: string;

  @Expose()
  password: string;
}
