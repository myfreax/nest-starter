import { PermissionAction, PermissionResource } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../shared/shared.module';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';

describe('PermissionsController', () => {
  let controller: PermissionsController;
  let module: TestingModule;
  let permission: PermissionEntity;
  let createPermission: () => Promise<PermissionEntity>;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [SharedModule],
      controllers: [PermissionsController],
      providers: [PermissionsService],
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);

    createPermission = async () => {
      const createPermissionDto: CreatePermissionDto = {
        resource: PermissionResource.permission,
        action: PermissionAction.create_any,
        attributes: '*,!view',
      };
      return controller.create(createPermissionDto);
    };
  });

  beforeEach(() => {
    permission = null;
  });

  afterEach(async () => {
    if (permission && permission.id) {
      await controller.remove({ id: permission.id });
    }
  });

  afterAll(() => {
    module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create permission', async () => {
    permission = await createPermission();
    expect(permission.id).toBeDefined();
    expect(permission.id).toBeGreaterThan(1);
  });

  it('should be update permission', async () => {
    permission = await createPermission();
    const updatePermissionDto: UpdatePermissionDto = {
      action: PermissionAction.read_any,
      attributes: '*',
      resource: PermissionResource.permission,
    };
    const res = await controller.update(
      { id: permission.id },
      updatePermissionDto,
    );
    expect(res.id).toEqual(permission.id);
    expect(res.action).toEqual(updatePermissionDto.action);
    expect(res.attributes).toEqual(updatePermissionDto.attributes);
    expect(res.resource).toEqual(updatePermissionDto.resource);
  });

  it('should be find one permission', async () => {
    permission = await createPermission();
    const res = await controller.findOne({ id: permission.id });
    expect(res.id).toEqual(permission.id);
  });

  it('should be find all permission', async () => {
    permission = await createPermission();
    const res = await controller.findAll();
    expect(res).toContainEqual(permission);
  });

  it('should be remove permission', async () => {
    permission = await createPermission();
    const r = await controller.remove({ id: permission.id });
    const res = await controller.findOne({ id: permission.id });
    expect(r.id).toEqual(permission.id);
    expect(res).toEqual(null);
    permission = null;
  });
});
