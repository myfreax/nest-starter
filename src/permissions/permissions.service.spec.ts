import { PermissionAction } from '.prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../shared/shared.module';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionsService } from './permissions.service';

describe('PermissionsService', () => {
  let service: PermissionsService;
  let module: TestingModule;
  let permissions: PermissionEntity[] = [];
  let createPermission: () => Promise<PermissionEntity>;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [PermissionsService],
    }).compile();

    service = module.get<PermissionsService>(PermissionsService);

    createPermission = async () => {
      let CreatePermissionDto: CreatePermissionDto = {
        resource: 'test',
        action: PermissionAction.create_any,
        attributes: '*',
      };
      const permission = await service.create(CreatePermissionDto);
      permissions.push(permission);
      return permission;
    };
  });

  afterAll(() => {
    module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be create permission', async () => {
    const permission = await createPermission();
    expect(permission.id).toBeDefined();
  });
});
