import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createApp } from './fixtures/app';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp();
  });

  afterAll(() => {
    app.close();
  });

  it('/ (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
      .end(done);
  });
});
