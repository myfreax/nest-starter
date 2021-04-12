import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';
import { Type, Expose } from 'class-transformer';

export class NotFoundDto {
  @ApiProperty({ example: 'Bad Request' })
  @IsInt()
  @Expose()
  readonly statusCode: 404;

  @ApiProperty({
    example: 'Not Found',
  })
  @Expose()
  message: string;


  constructor(message: string){
    this.message = message
  }  
}
