import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../shared/shared.module';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create user', async () => {
    let email =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '@gmail.com'
    const user: CreateUsersDto = {
      email,
      password: 'randomPassword',
      roleId: 1,
    };
    const res = await service.create(user);
    expect(res.id).toBeDefined()
  });
});
