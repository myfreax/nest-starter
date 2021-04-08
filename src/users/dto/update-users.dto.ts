import { UserEntity } from '../entities/user.entity';
import { Expose } from 'class-transformer';
import { OmitType } from '@nestjs/swagger';

export class UpdateUsersDto extends OmitType(UserEntity, ['id'] as const) {}
