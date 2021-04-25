import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginedDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......',
    description: 'jwt token',
  })
  @Expose()
  token: string;
}
