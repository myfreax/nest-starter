import { OmitType } from '@nestjs/swagger';
import { RoleEntity } from '../entities/role.entity';

export class CreateRoleDto extends OmitType(RoleEntity, ['id'] as const) {}
