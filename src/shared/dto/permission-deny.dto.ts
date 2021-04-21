import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class PermissionDenyDto {
  @ApiProperty({ example: 'Bad Request' })
  @IsString()
  @Expose()
  error: string;

  @ApiProperty({
    example: ['email format error'],
    isArray: true,
  })
  @Expose()
  message: string[];
}
