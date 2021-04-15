import { INestApplication } from '@nestjs/common';
import { CreateUsersDto } from '../src/users/dto/create-users.dto';
import * as request from 'supertest';
import { UserEntity } from '../src/users/entities/user.entity';
import { createApp, createToken, createUser, delUser } from './fixtures/app';

describe('UsersController (e2e)', () => {
  const apiEndPoint = '/api/users';
  let app: INestApplication;
  let token: string;
  let server: any;
  let user: UserEntity;
  const bearer: { type: 'bearer' } = { type: 'bearer' };
  const makeEmail: () => string = () => {
    return Math.random().toString(36).substring(2, 15) + '@myfreax.com';
  };
  const makeUser = (): CreateUsersDto => {
    return {
      email: makeEmail(),
      password: 'myfreax.com',
      roleId: 1,
    };
  };

  beforeAll(async () => {
    app = await createApp();
    server = app.getHttpServer();
    token = await createToken(app);
  });

  beforeEach(async () => {
    user = null;
  });

  afterEach(async () => {
    if (user) {
      await delUser(app, user);
    }
  });

  afterAll(async () => {
    app.close();
  });
  it('/api/users (POST) create user without token', async () => {
    return request(server).post(apiEndPoint).send(makeUser()).expect(401);
  });

  it('/api/users (POST) create user', async () => {
    return request(server)
      .post(apiEndPoint)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(makeUser())
      .expect(201)
      .then(({ body }) => {
        user = body;
        expect(body).toHaveProperty('id');
        expect(body.email).toEqual(user.email);
      });
  });

  it('/api/users (POST) create user with error email format', async () => {
    const createUsersDto = makeUser();
    createUsersDto.email = createUsersDto.email.replace('@', '');
    return request(server)
      .post(apiEndPoint)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(createUsersDto)
      .expect(400)
      .catch((err) => {
        expect(err.error).toEqual('Bad Request');
        expect(err.message).toBeInstanceOf(Array);
      });
  });

  it('/api/users (POST) create user without password', async () => {
    const createUsersDto = makeUser();
    createUsersDto.password = '';
    return request(server)
      .post(apiEndPoint)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(createUsersDto)
      .expect(400)
      .then(({ body }) => {
        expect(body.error).toEqual('Bad Request');
        expect(body.message).toBeInstanceOf(Array);
        expect(body.message.join()).toMatch(/password/);
      });
  });

  it('/api/users (POST) create user with not exist roleId', async () => {
    const createUsersDto = makeUser();
    createUsersDto.roleId = 2147483627;
    return request(server)
      .post(apiEndPoint)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(createUsersDto)
      .expect(400)
      .then(({ body }) => {
        expect(body.error).toEqual('Bad Request');
        expect(body.message).toBeInstanceOf(Array);
        expect(body.message.join()).toMatch(/roleId/);
      });
  });

  it('/api/users (POST) create one is allreay exist user', async () => {
    user = await createUser(app);
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
        expect(body.message.join()).toMatch(/email/);
      });
  });

  it('/api/users (GET) find one user', async () => {
    user = await createUser(app);
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
    user = await createUser(app);
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
    user = await createUser(app);
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
    return request(server)
      .patch(`${apiEndPoint}/2147483627`)
      .auth(token, bearer)
      .send(makeUser())
      .set('Accept', 'application/json')
      .expect(400)
      .then((res) => {
        expect(res.body.error).toEqual('Bad Request');
        expect(res.body.message).toBeInstanceOf(Array);
        expect(res.body.message.join()).toMatch(/id/);
      });
  });

  it('/api/users (DELETE) delete user by id', async () => {
    user = await createUser(app);
    return request(server)
      .delete(`${apiEndPoint}/${user.id}`)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body.id).toEqual(user.id);
        user = undefined;
      });
  });

  it('/api/users (DELETE) delete not exist user', async () => {
    return request(server)
      .delete(`${apiEndPoint}/2147483627`)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect(400)
      .then((res) => {
        expect(res.body.error).toEqual('Bad Request');
        expect(res.body.message).toBeInstanceOf(Array);
        expect(res.body.message.join()).toMatch(/id/);
      });
  });
});
