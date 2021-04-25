import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokenExpired {
  @ApiProperty({
    example: 'TokenExpiredError',
    description: 'TokenExpiredError',
  })
  @Expose()
  name: string;

  @ApiProperty({
    example: 'jwt expired',
    description: 'Jwt token expired message',
  })
  @Expose()
  message: string;

  @ApiProperty({
    example: '2021-04-08T14:20:24.000Z',
    description: 'Jwt token expired at time',
  })
  @Expose()
  expiredAt: Date;
}
