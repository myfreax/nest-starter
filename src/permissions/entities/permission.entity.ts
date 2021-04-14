import { Permission, PermissionAction } from '.prisma/client';
import { IsString, IsInt } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ID, IdDto } from '../../shared/dto/id-dto';
import { IsExist } from '../../shared/decorators/isExist-decorator';
export enum Action {
  CreateAny = 'create:any',
  ReacdAny = 'read:any',
  UpdateAny = 'update:any',
  DeleteAny = 'delete:any',
  DeleteOwn = 'delete:own',
  UpdateOwn = 'update:own',
}
export class PermissionEntity extends IdDto implements Permission {
  @ApiProperty({
    example: 'user',
  })
  @Type(() => String)
  @Expose()
  @IsString()
  resource: string;

  @ApiProperty({
    example: PermissionAction.create_any,
    enum: PermissionAction,
  })
  @Expose()
  @IsString()
  action: PermissionAction;

  @ApiProperty({
    example: '*, !views',
  })
  @IsString()
  @Expose()
  @Type(() => String)
  attributes: string;
}

export class CheckIdDto extends IdDto {
  @ID()
  @IsExist({ findInTable: 'permission' })
  id: number;
}

export class UniqueField extends IdDto implements PropertyOption<PermissionEntity> {}
