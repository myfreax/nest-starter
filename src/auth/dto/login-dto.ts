import { Expose } from 'class-transformer';
import { UserEntity } from 'src/users/user.entity';

export class LoginDto extends UserEntity {
  @Expose()
  username: string;

  @Expose()
  password: string;
}
