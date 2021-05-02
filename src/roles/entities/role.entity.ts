import { Role } from '@prisma/client';
import { IdDto } from '../../shared/dto/id.dto';

export class RoleEntity extends IdDto implements PropertyOption<Role> {
  name: string;
}
