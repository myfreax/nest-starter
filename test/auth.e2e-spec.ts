import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/shared/prisma.service';
import { CreateUsersDto } from '../src/users/dto/create-users.dto';
import { UserEntity } from 'src/users/entities/user.entity';
const apiEndPoint = '/api/auth/login';
describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let user: UserEntity;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);
    try {
      user = await prisma.user.findFirst();
      if (!user) {
        const data: CreateUsersDto = {
          email: 'web@myfreax.com',
          roleId: 1,
          password: 'myfreax',
        };
        user = await prisma.user.create({
          data,
        });
      }
    } catch (_) {}
    await app.init();
  });

  afterAll(async () => {
    if (user.email == 'web@myfreax.com') {
      await prisma.user.delete({ where: { id: user.id } });
    }
    app.close();
  });

  it(`/api/auth/login (POST)`, () => {
    return request(app.getHttpServer())
      .post(apiEndPoint)
      .send({ email: user.email, password: user.password })
      .then((res) => {
        expect(res.body).toHaveProperty('token');
      });
  });

  it('/api/auth/login (POST) with invalid user', (done) => {
    return request(app.getHttpServer())
      .post(apiEndPoint)
      .send({ username: 'xx', password: 'xxx' })
      .expect(401)
      .end(done);
  });
});
