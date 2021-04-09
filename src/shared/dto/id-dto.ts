import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { Type, Expose } from 'class-transformer';

export class IdDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Expose()
  id: number;
}
