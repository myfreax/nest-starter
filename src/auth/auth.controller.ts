import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public';
import { ApiBearerAuth, ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login-dto';
import { LoginedDto } from './dto/logined-dto';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 201,
    type: () => LoginedDto,
    description: 'The has been successfully Logined.',
  })
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //TODO https://stackoverflow.com/questions/21978658/invalidating-json-web-tokens/23089839#23089839
  @Post('/loginout')
  async loginOut() {
    // return this.authService.loginout()
  }
}
