import { PermissionAction } from '.prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../shared/shared.module';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionsService } from './permissions.service';

describe('PermissionsService', () => {
  let service: PermissionsService;
  let module: TestingModule;
  let permission: PermissionEntity;
  let createPermission: () => Promise<PermissionEntity>;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [PermissionsService],
    }).compile();

    service = module.get<PermissionsService>(PermissionsService);

    createPermission = async () => {
      const createPermissionDto: CreatePermissionDto = {
        resource: 'test',
        action: PermissionAction.create_any,
        attributes: '*',
      };
      permission = await service.create(createPermissionDto);
      return permission;
    };
  });

  beforeEach(() => {
    permission = null;
  });
  afterEach(async () => {
    if (permission) {
      await service.remove({ id: permission.id });
    }
  });
  afterAll(() => {
    module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be create permission', async () => {
    permission = await createPermission();
    expect(permission.id).toBeDefined();
  });

  it('should be update permission', async () => {
    permission = await createPermission();
    const updatePermissionDto: UpdatePermissionDto = {
      resource: 'xxx',
      attributes: '*,!view',
      action: PermissionAction.read_any,
    };
    const res = await service.update(
      { id: permission.id },
      updatePermissionDto,
    );
    expect(res.id).toEqual(permission.id);
    expect(res.resource).toEqual(updatePermissionDto.resource);
    expect(res.action).toEqual(updatePermissionDto.action);
    expect(res.attributes).toEqual(updatePermissionDto.attributes);
  });

  it('should be find one permission', async () => {
    permission = await createPermission();
    const res = await service.findOne({ id: permission.id });
    expect(res.id).toEqual(permission.id);
  });

  it('should be find all permission', async () => {
    permission = await createPermission();
    const res = await service.findAll();
    expect(res).toContainEqual(permission);
  });

  it('should be delete permission', async () => {
    permission = await createPermission();
    const res = await service.remove({ id: permission.id });
    const r = await service.findOne({ id: permission.id });
    expect(res.id).toEqual(permission.id);
    expect(r).toEqual(null);
    permission = null;
  });
});
