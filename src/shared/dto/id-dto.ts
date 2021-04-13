import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { applyDecorators } from '@nestjs/common';
export function ID( ) {
  return applyDecorators(
    ApiProperty({
      example: 1,
    }),
    Type(() => Number),
    IsInt(),
    Min(1),
    Expose(),
  );
}

export class IdDto {
  @ID()
  id: number;
}
