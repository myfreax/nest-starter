import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';
import { Type, Expose } from 'class-transformer';

export class ParamsValidateFailDto {
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
