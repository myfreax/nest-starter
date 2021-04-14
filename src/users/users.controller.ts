import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UserEntity, CheckIdDto } from './entities/user.entity';
import { IdDto } from '../shared/dto/id-dto';
import { ControllerDecorator } from '../shared/decorators/controller-decorator';
import { FindDecorator } from '../shared/decorators/find-decorator';

@ControllerDecorator('users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 201,
    type: () => UserEntity,
    description: 'Created User.',
  })
  @Post()
  create(@Body() createUsersDto: CreateUsersDto): Promise<UserEntity> {
    return this.usersService.create(createUsersDto);
  }

  @FindDecorator({
    description: 'find user by id',
    type: () => UserEntity,
    isArray: true,
  })
  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @FindDecorator({ description: 'find user by id', type: () => UserEntity })
  @Get(':id')
  findOne(@Param() idDto: IdDto): Promise<UserEntity> {
    return this.usersService.findOne({ id: idDto.id });
  }

  @ApiResponse({
    status: 200,
    type: () => UserEntity,
    description: 'update user by id.',
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
    description: 'remove user by id.',
  })
  @Delete(':id')
  remove(@Param() idDto: CheckIdDto): Promise<UserEntity> {
    return this.usersService.remove({ id: idDto.id });
  }
}
