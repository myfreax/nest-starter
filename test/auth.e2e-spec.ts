import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
const apiEndPoint = '/api/auth/login';
describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  it(`/api/auth/login (POST)`, () => {
    return request(app.getHttpServer())
      .post(apiEndPoint)
      .send({ username: 'john', password: 'changeme' })
      .then((res) => {
        expect(res.body).toHaveProperty('token');
      });
  });

  it('/api/auth/login (POST) with invalid user', () => {
    return request(app.getHttpServer())
      .post(apiEndPoint)
      .send({ username: 'xx', password: 'xxx' })
      .expect(401);
  });
});
