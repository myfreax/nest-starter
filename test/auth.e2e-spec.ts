import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserEntity } from 'src/users/entities/user.entity';
import { createApp, createUser, delUser } from './fixtures/app';

describe('AuthController (e2e)', () => {
  const apiEndPoint = '/api/auth/login';
  let app: INestApplication;
  let user: UserEntity;
  let server: any;
  beforeAll(async () => {
    app = await createApp();
    server = app.getHttpServer();
    user = await createUser(app);
  });

  afterAll(async () => {
    await delUser(app, user);
    app.close();
  });

  it(`/api/auth/login (POST)`, () => {
    return request(server)
      .post(apiEndPoint)
      .send({ email: user.email, password: user.password })
      .then((res) => {
        expect(res.body).toHaveProperty('token');
      });
  });

  it('/api/auth/login (POST) with invalid user', (done) => {
    return request(server)
      .post(apiEndPoint)
      .send({ username: 'xx', password: 'xxx' })
      .expect(401)
      .end(done);
  });
});
