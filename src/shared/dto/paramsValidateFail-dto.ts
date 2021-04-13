import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class ParamsValidateFailDto {
  @ApiProperty({ example: 'Bad Request' })
  @IsString()
  @Expose()
  error: string;

  @ApiProperty({
    example: ['email format error', '....more'],
    isArray: true,
  })
  @Expose()
  message: string[];
}
