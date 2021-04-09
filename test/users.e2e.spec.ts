import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/shared/prisma.service';
import { CreateUsersDto } from '../src/users/dto/create-users.dto';
import * as request from 'supertest';
import { UserEntity } from '../src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { isEmail, useContainer } from 'class-validator';
const apiEndPoint = '/api/users';
describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const emails: string[] = [];
  let token: string;
  const bearer: { type: 'bearer' } = { type: 'bearer' };
  const makeEmail = (afterRemove = true) => {
    const email = Math.random().toString(36).substring(2, 15) + '@myfreax.com';
    if (afterRemove) {
      emails.push(email);
    }
    if (!isEmail(email)) {
      makeEmail(afterRemove);
    } else {
      return email;
    }
  };
  const makeUser = (afterRemove = true): CreateUsersDto => {
    return {
      email: makeEmail(afterRemove),
      password: 'myfreax.com',
      roleId: 1,
    };
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    useContainer(app, { fallbackOnErrors: true })
    const jwt = app.get<JwtService>(JwtService);
    token = jwt.sign({ email: 'web@myfreax.com', userId: 1, roleId: 1 });
    prisma = app.get<PrismaService>(PrismaService);
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          strategy: 'exposeAll',
          excludeExtraneousValues: true,
        },
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await Promise.all(
      emails.map((email) => prisma.user.delete({ where: { email } })),
    );
    await prisma.onModuleDestroy();
    app.close();
  });
  it('/api/users (POST) create user without token', async () => {
    const user = makeUser(false);
    return request(app.getHttpServer())
      .post(apiEndPoint)
      .send(user)
      .expect(401);
  });

  it('/api/users (POST) create user', async () => {
    const user = makeUser();
    return request(app.getHttpServer())
      .post(apiEndPoint)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(user)
      .expect(201)
      .then(({ body }) => {
        expect(body).toHaveProperty('id');
        expect(body.email).toEqual(user.email);
      });
  });
  it('/api/users (POST) create user with error email format', async () => {
    const user = makeUser(false);
    user.email = user.email.replace('@', '');
    return request(app.getHttpServer())
      .post(apiEndPoint)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(user)
      .expect(400)
      .catch((err) => {
        expect(err.error).toEqual('Bad Request');
        expect(err.message).toBeInstanceOf(Array);
      });
  });

  it('/api/users (POST) create user without password', async () => {
    const user = makeUser(false);
    user.password = '';
    return request(app.getHttpServer())
      .post(apiEndPoint)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(user)
      .expect(400)
      .catch((err) => {
        expect(err.error).toEqual('Bad Request');
        expect(err.message).toBeInstanceOf(Array);
      });
  });
  it('/api/users (POST) create user with error roleId', async () => {
    const user = makeUser();
    user.roleId = 10000000;
    return request(app.getHttpServer())
      .post(apiEndPoint)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(user)
      .expect(400)
      .catch((err) => {
        expect(err.error).toEqual('Bad Request');
        expect(err.message).toBeInstanceOf(Array);
      });
  });
});
