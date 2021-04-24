import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import jwtConfig from '../config/jwt.config';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

describe('AuthController', () => {
  let controller: AuthController;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        UsersModule,
        ConfigModule.forRoot({ load: [jwtConfig] }),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (
            configService: ConfigService,
          ): Promise<JwtModuleOptions> => {
            return configService.get<JwtModuleOptions>('jwt');
          },
          inject: [ConfigService],
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });
  afterAll(() => {
    module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
