import { Permission } from '.prisma/client';
import { IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PermissionEntity implements Permission {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsString()
  resource: string;

  @ApiProperty()
  @IsString()
  action: string;

  @ApiProperty()
  @IsString()
  attributes: string;
}
