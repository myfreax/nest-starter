import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../shared/shared.module';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let users: UserEntity[];
  let module: TestingModule;
  beforeAll(async () => {
    users = [];
    module = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [UsersService],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await Promise.all(users.map((user) => service.remove({ id: user.id })));
    module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  const createUser = async (afterRemove = true) => {
    const email =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15) +
      `@${Math.random().toString(36).substring(2, 15)}.${Math.random()
        .toString(36)
        .substring(2, 15)}`;
    const createUsersDto: CreateUsersDto = {
      email,
      password: 'randomPassword',
      roleId: 1,
    };
    const user = await service.create(createUsersDto);
    if (afterRemove) {
      users.push(user);
    }
    return user;
  };

  it('should create user', async () => {
    const user = await createUser();
    expect(user.id).toBeDefined();
  });

  it('find user by id', async () => {
    const user = await createUser();
    const res = await service.findOne({ id: user.id });
    expect(res.id).toEqual(user.id);
  });

  it('should update user password', async () => {
    let user = await createUser();
    const updateUserDto: UpdateUsersDto = {
      password: 'randomPassword123456',
    };
    user = await service.update({ id: user.id }, updateUserDto);
    expect(user.password).toEqual(updateUserDto.password);
  });

  it('should delete user by id', async () => {
    const user = await createUser(false);
    await service.remove({ id: user.id });
    const res = await service.findOne({ id: user.id });
    expect(res).toEqual(null);
  });
});
