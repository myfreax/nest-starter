import { UserEntity } from '../entities/user.entity';
import { OmitType } from '@nestjs/swagger';

export class UpdateUsersDto extends OmitType(UserEntity, ['id'] as const) {}
