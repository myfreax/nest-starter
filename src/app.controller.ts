import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/public';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}
  @Public()
  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
