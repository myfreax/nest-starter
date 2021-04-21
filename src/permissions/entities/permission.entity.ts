import { Permission, PermissionAction } from '@prisma/client';
import { IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ID, IdDto } from '../../shared/dto/id.dto';
import { IsExist } from '../../shared/validators/exist';
import { createEnum } from '../../shared/operator/create-enum';

// TODO: this Action only read, But now you can overwrite action perproty, fix it.
export const Action = createEnum<typeof PermissionAction>({
  update_any: 'update:any',
  delete_any: 'delete:any',
  create_any: 'create:any',
  read_any: 'read:any',
  update_own: 'update:own',
  delete_own: 'delete:own',
  create_own: 'create:own',
  read_own: 'read:own',
});

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
  @IsExist({ table: 'permission' })
  id: number;
}

export class UniqueField
  extends IdDto
  implements PropertyOption<PermissionEntity> {}
