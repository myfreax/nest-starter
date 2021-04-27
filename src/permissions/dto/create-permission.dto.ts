import { PermissionEntity, UniqueField } from '../entities/permission.entity';
import { OmitType } from '@nestjs/swagger';
import { IsUnique } from '../../shared/decorators/unique';

@IsUnique<UniqueField>({ table: 'permission', field: 'permission' })
export class CreatePermissionDto extends OmitType(PermissionEntity, [
  'id',
] as const) {}
