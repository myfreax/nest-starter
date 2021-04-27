import { INestApplication } from '@nestjs/common';
import { PermissionEntity } from '../src/permissions/entities/permission.entity';
import { PrismaService } from '../src/shared/prisma.service';
import * as request from 'supertest';
import { createApp, createToken } from './fixtures/app';
import { CreatePermissionDto } from 'src/permissions/dto/create-permission.dto';
import { PermissionAction, PermissionResource } from '@prisma/client';

describe('PermissionsController (e2e)', () => {
  const apiEndPoint = '/api/permissions';
  let app: INestApplication;
  let token: string;
  let server: any;
  let permission: PermissionEntity;
  let prisma: PrismaService;
  let std: { stderr: string; stdout: string };
  const bearer: { type: 'bearer' } = { type: 'bearer' };
  const makePermission = (): CreatePermissionDto => {
    return {
      resource: PermissionResource.user,
      attributes: '*,!view,rate',
      action: PermissionAction.create_any,
    };
  };
  beforeAll(async () => {
    app = await createApp();
    prisma = app.get<PrismaService>(PrismaService);
    server = app.getHttpServer();
    token = await createToken(app);
  });

  beforeEach(async () => {
    permission = null;
  });

  afterEach(async () => {
    if (permission) {
      await prisma.permission.delete({ where: { id: permission.id } });
    }
  });

  afterAll(async () => {
    app.close();
  });

  it('/api/permissions (POST) create permission', async () => {
    const createPermissionDto = makePermission();
    return request(server)
      .post(apiEndPoint)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(createPermissionDto)
      .expect(201)
      .then((res) => {
        permission = res.body;
        expect(permission).toHaveProperty('id');
        expect(permission.action).toEqual(createPermissionDto.action);
        expect(permission.attributes).toEqual(createPermissionDto.attributes);
        expect(permission.resource).toEqual(createPermissionDto.resource);
      });
  });

  it('/api/permissions (POST) create permission without token', async () => {
    return request(server)
      .post(apiEndPoint)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send()
      .expect(401);
  });

  it('/api/permissions (POST) create permission with error action', async () => {
    const createPermissionDto = makePermission();
    return request(server)
      .post(apiEndPoint)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ ...createPermissionDto, action: 'xxxxx' })
      .expect(400)
      .then((res) => {
        expect(res.body.error).toEqual('Bad Request');
        expect(res.body.message).toBeInstanceOf(Array);
        expect(res.body.message.join()).toMatch(/action/);
      });
  });

  it('/api/permissions (POST) create permission without error resouce', async () => {
    const createPermissionDto = makePermission();
    return request(server)
      .post(apiEndPoint)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ ...createPermissionDto, resource: 'xxxxxx' })
      .expect(400)
      .then((res) => {
        expect(res.body.error).toEqual('Bad Request');
        expect(res.body.message).toBeInstanceOf(Array);
        expect(res.body.message.join()).toMatch(/resource/);
      });
  });

  it('/api/permissions (POST) create permission without attributes', async () => {
    const createPermissionDto = makePermission();
    return request(server)
      .post(apiEndPoint)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ ...createPermissionDto, attributes: '' })
      .expect(400)
      .then((res) => {
        expect(res.body.error).toEqual('Bad Request');
        expect(res.body.message).toBeInstanceOf(Array);
        expect(res.body.message.join()).toMatch(/attributes/);
      });
  });

  it('/api/permissions (POST) create allreay exist permission', async () => {
    const createPermissionDto = makePermission();
    permission = await prisma.permission.create({ data: createPermissionDto });
    return request(server)
      .post(apiEndPoint)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(createPermissionDto)
      .expect(400)
      .then((res) => {
        expect(res.body.error).toEqual('Bad Request');
        expect(res.body.message).toBeInstanceOf(Array);
        expect(res.body.message.join()).toMatch(/permission/);
      });
  });

  it('/api/permissions (GET) find one permission', async () => {
    const createPermissionDto = makePermission();
    permission = await prisma.permission.create({ data: createPermissionDto });
    return request(server)
      .get(`${apiEndPoint}/${permission.id}`)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send()
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(permission);
      });
  });

  it('/api/permissions (GET) find not exist permission', async () => {
    return request(server)
      .get(`${apiEndPoint}/2147483627`)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send()
      .expect(404);
  });

  it('/api/permissions (GET) find one permission without token', async () => {
    permission = await prisma.permission.create({ data: makePermission() });
    return request(server)
      .get(`${apiEndPoint}/${permission.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send()
      .expect(401);
  });

  it('/api/permissions (PATCH) update permission with error action', async () => {
    const createPermissionDto = makePermission();
    permission = await prisma.permission.create({ data: createPermissionDto });
    return request(server)
      .patch(`${apiEndPoint}/${permission.id}`)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ ...createPermissionDto, action: 'xxxxx' })
      .expect(400)
      .then((res) => {
        expect(res.body.error).toEqual('Bad Request');
        expect(res.body.message).toBeInstanceOf(Array);
        expect(res.body.message.join()).toMatch(/action/);
      });
  });

  it('/api/permissions (PATCH) update permission with error resource', async () => {
    const createPermissionDto = makePermission();
    permission = await prisma.permission.create({ data: createPermissionDto });
    return request(server)
      .patch(`${apiEndPoint}/${permission.id}`)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ ...createPermissionDto, resource: 'xxxxx' })
      .expect(400)
      .then((res) => {
        expect(res.body.error).toEqual('Bad Request');
        expect(res.body.message).toBeInstanceOf(Array);
        expect(res.body.message.join()).toMatch(/resource/);
      });
  });

  it('/api/permissions (PATCH) update permission without attributes', async () => {
    const createPermissionDto = makePermission();
    permission = await prisma.permission.create({ data: createPermissionDto });
    return request(server)
      .patch(`${apiEndPoint}/${permission.id}`)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ ...createPermissionDto, action: '' })
      .expect(400)
      .then((res) => {
        expect(res.body.error).toEqual('Bad Request');
        expect(res.body.message).toBeInstanceOf(Array);
        expect(res.body.message.join()).toMatch(/action/);
      });
  });

  it('/api/permissions (PATCH) update one not exist permissions', async () => {
    const createPermissionDto = makePermission();
    return request(server)
      .patch(`${apiEndPoint}/2147483627`)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ ...createPermissionDto })
      .expect(400)
      .then((res) => {
        expect(res.body.error).toEqual('Bad Request');
        expect(res.body.message).toBeInstanceOf(Array);
        expect(res.body.message.join()).toMatch(/id/);
      });
  });

  it('/api/permissions (DELETE) delete not exist permission', async () => {
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

  it('/api/permissions (DELETE) delete permission without token', async () => {
    const createPermissionDto = makePermission();
    permission = await prisma.permission.create({ data: createPermissionDto });
    request(server)
      .delete(`${apiEndPoint}/${permission.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send()
      .expect(401);
  });

  it('/api/permissions (DELETE) delete user by id', async () => {
    permission = await prisma.permission.create({ data: makePermission() });
    return request(server)
      .delete(`${apiEndPoint}/${permission.id}`)
      .auth(token, bearer)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body.id).toEqual(permission.id);
        permission = undefined;
      });
  });
});
