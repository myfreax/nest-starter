import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UserEntity, CheckIdDto } from './entities/user.entity';
import { IdDto } from '../shared/dto/id.dto';
import { Controller } from '../shared/decorators/controller';
import { Find } from '../shared/decorators/find';

@Controller('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 201,
    type: () => UserEntity,
    description: 'Create User.',
  })
  @Post()
  create(@Body() createUsersDto: CreateUsersDto): Promise<UserEntity> {
    return this.usersService.create(createUsersDto);
  }

  @Find({
    description: 'Find user by id',
    type: () => UserEntity,
    isArray: true,
  })
  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Find({ description: 'Find user by id', type: () => UserEntity })
  @Get(':id')
  findOne(@Param() idDto: IdDto): Promise<UserEntity> {
    return this.usersService.findOne({ id: idDto.id });
  }

  @ApiResponse({
    status: 200,
    type: () => UserEntity,
    description: 'Update user by id.',
  })
  @Patch(':id')
  update(
    @Param() idDto: CheckIdDto,
    @Body() updateUsersDto: UpdateUsersDto,
  ): Promise<UserEntity> {
    return this.usersService.update({ id: idDto.id }, updateUsersDto);
  }

  @ApiResponse({
    status: 200,
    type: () => UserEntity,
    description: 'Remove user by id.',
  })
  @Delete(':id')
  remove(@Param() idDto: CheckIdDto): Promise<UserEntity> {
    return this.usersService.remove({ id: idDto.id });
  }
}
