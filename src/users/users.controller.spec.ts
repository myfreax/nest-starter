import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../shared/shared.module';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let users: UserEntity[];
  beforeEach(async () => {
    users = [];
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });
  afterEach(async () => {
    await Promise.all(users.map((user) => controller.remove({ id: user.id })));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
    const user = await controller.create(createUsersDto);
    if (afterRemove) {
      users.push(user);
    }
    return user;
  };

  it('should create user and return it', async () => {
    const user = await createUser();
    expect(user.id).toBeDefined();
  });

  it('find one user by id', async () => {
    const user = await createUser();
    const res = await controller.findOne({ id: user.id });
    expect(res.id).toEqual(user.id);
  });

  it('should update user password', async () => {
    let user = await createUser();
    const updateUserDto: UpdateUsersDto = {
      password: 'randomPassword123456',
    };
    user = await controller.update({ id: user.id }, updateUserDto);
    expect(user.password).toEqual(updateUserDto.password);
  });

  it('should delete user by id', async () => {
    const user = await createUser(false);
    await controller.remove({ id: user.id });
    const res = await controller.findOne({ id: user.id });
    expect(res).toEqual(null);
  });
});
