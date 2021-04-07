import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports:[SharedModule],
  controllers: [PermissionsController],
  providers: [PermissionsService]
})
export class PermissionsModule {}
