import { Role } from '@prisma/client';
import { IdDto } from 'src/shared/dto/id-dto';

export class RoleEntity extends IdDto implements PropertyOption<Role> {
  id: number;
  name: string;
}
