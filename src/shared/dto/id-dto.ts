import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { IsExist } from '../decorators/isExist-decorator';
// TODO: how reuse this decorator
export class IdDto {
  @ApiProperty({
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Expose()
  id: number;
}

export class CheckIdDto {
  @ApiProperty({
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsExist({ findInTable: 'user' })
  @Expose()
  id: number;
}
