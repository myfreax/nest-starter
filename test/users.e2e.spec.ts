import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/shared/prisma.service';
import { CreateUsersDto } from '../src/users/dto/create-users.dto';
import * as request from 'supertest';
import { UserEntity } from '../src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { isEmail, useContainer } from 'class-validator';
import { NotFoundInterceptor } from '../src/shared/interceptors/notFoundInterceptor';
const apiEndPoint = '/api/users';
describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const emails: string[] = [];
  let token: string;
  let server: any;
  const bearer: { type: 'bearer' } = { type: 'bearer' };
  let testUser: UserEntity;

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

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new NotFoundInterceptor());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          strategy: 'exposeAll',
          excludeExtraneousValues: true,
        },
      }),
    );

    const jwt = app.get<JwtService>(JwtService);
    token = jwt.sign(
      { email: 'web@myfreax.com', userId: 1, roleId: 1 },
      { expiresIn: '24h' },
    );
    prisma = app.get<PrismaService>(PrismaService);
    testUser = await prisma.user.create({
      data: makeUser(),
    });
    await app.init();
    server = app.getHttpServer();
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
    return request(server).post(apiEndPoint).send(user).expect(401);
  });

  it('/api/users (POST) create user', async () => {
    const user = makeUser();
    return request(server)
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
    return request(server)
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
    return request(server)
      .post(apiEndPoint)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(user)
      .expect(400)
      .then(({ body }) => {
        expect(body.error).toEqual('Bad Request');
        expect(body.message).toBeInstanceOf(Array);
        expect(body.message.join()).toMatch(/password/);
      });
  });

  it('/api/users (POST) create user with not exist roleId', async () => {
    const user = makeUser(false);
    user.roleId = 2147483627;
    return request(server)
      .post(apiEndPoint)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(user)
      .expect(400)
      .then(({ body }) => {
        expect(body.error).toEqual('Bad Request');
        expect(body.message).toBeInstanceOf(Array);
        expect(body.message.join()).toMatch(/roleId/);
      });
  });

  it('/api/users (POST) create one is allreay exist user', async () => {
    return request(server)
      .post(apiEndPoint)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(testUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.error).toEqual('Bad Request');
        expect(body.message).toBeInstanceOf(Array);
        expect(body.message.join()).toMatch(/email/);
      });
  });

  it('/api/users (GET) find one user', async () => {
    const user = await prisma.user.create({ data: makeUser() });
    return request(server)
      .get(`${apiEndPoint}/${user.id}`)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body.id).toEqual(user.id);
      });
  });

  it('/api/users (GET) find not exist user', async () => {
    return request(server)
      .get(`${apiEndPoint}/2147483627`)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect(404)
      .then((res) => {
        expect(res.body.message).toEqual('Not Found');
        expect(res.body.statusCode).toEqual(404);
      });
  });

  it('/api/users (PATCH) update user', async () => {
    const user = await prisma.user.create({ data: makeUser(false) });
    user.password = 'myfreax.com';
    user.email = makeEmail();
    return request(server)
      .patch(`${apiEndPoint}/${user.id}`)
      .auth(token, bearer)
      .send(user)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body.id).toEqual(user.id);
        expect(res.body.email).toEqual(user.email);
        expect(res.body.password).toEqual(user.password);
      });
  });

  it('/api/users (PATCH) update user with not exist roleId', async () => {
    const user = await prisma.user.create({ data: makeUser() });
    user.roleId = 2147483627;
    return request(server)
      .patch(`${apiEndPoint}/${user.id}`)
      .auth(token, bearer)
      .send(user)
      .set('Accept', 'application/json')
      .expect(400)
      .then((res) => {
        expect(res.body.error).toEqual('Bad Request');
        expect(res.body.message).toBeInstanceOf(Array);
        expect(res.body.message.join()).toMatch(/roleId/);
      });
  });

  it('/api/users (PATCH) update not exist user', async () => {
    const user = makeUser(false);
    return request(server)
      .patch(`${apiEndPoint}/2147483627`)
      .auth(token, bearer)
      .send(user)
      .set('Accept', 'application/json')
      .expect(400)
      .then((res) => {
        expect(res.body.error).toEqual('Bad Request');
        expect(res.body.message).toBeInstanceOf(Array);
        expect(res.body.message.join()).toMatch(/id/);
      });
  });
});
