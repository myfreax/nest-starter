import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { SharedModule } from '../shared/shared.module';
import { PrismaService } from '../shared/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        SharedModule,
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: process.env.JWTSECRET || '',
          signOptions: { expiresIn: process.env.EXPRESIN || '' },
        }),
      ],
      providers: [
        PrismaService,
        AuthService,
        LocalStrategy,
        JwtStrategy,
        UsersService,
      ],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  afterAll(() => {
    moduleRef.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return a user object when credentials are valid', async () => {
    const res = await service.validateUser('maria@gmail.com', 'guess');
    if (res) {
      expect(res).toHaveProperty('id');
    }
  });

  it('should return null when credentials are invalid', async () => {
    const res = await service.validateUser('xxx', 'xxx');
    expect(res).toBeNull();
  });

  it('should return JWT object when credentials are valid', async () => {
    const res = await service.login({
      email: 'maria@gmail.com',
      id: 2,
      password: 'xx',
      roleId: 1,
    });
    expect(res.token).toBeDefined();
  });
});
