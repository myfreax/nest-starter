import { ApiProperty } from '@nestjs/swagger';

export class TokenExpiredError {
  @ApiProperty({
    example: 'TokenExpiredError',
  })
  name: string;
  @ApiProperty({
    example: 'jwt expired',
    description: 'Jwt token expired message',
  })
  message: string;

  @ApiProperty({
    example: '2021-04-08T14:20:24.000Z',
    description: 'Jwt token expired at time',
  })
  expiredAt: Date;
}
