import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Expose } from 'class-transformer';

export class NotFoundDto {
  @ApiProperty({ example: 404 })
  @IsInt()
  @Expose()
  readonly statusCode: 404;

  @ApiProperty({
    example: 'Not Found',
  })
  @Expose()
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
