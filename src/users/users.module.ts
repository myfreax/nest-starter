import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [SharedModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
