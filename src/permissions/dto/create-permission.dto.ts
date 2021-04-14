import { PermissionEntity } from '../entities/permission.entity';
import { OmitType } from '@nestjs/swagger';

export class CreatePermissionDto extends OmitType(PermissionEntity, [
  'id',
] as const) {
}
