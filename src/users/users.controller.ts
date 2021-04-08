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
import { ApiBearerAuth, ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { TokenExpiredError } from '../auth/dto/tokenExpiredError-dto';
import { LoginDto } from 'src/auth/dto/login-dto';
import { LoginedDto } from 'src/auth/dto/logined-dto';

@ApiBearerAuth()
@ApiTags('Users')
@ApiResponse({
  status: 401,
  description: 'Unauthorized.',
  type: () => TokenExpiredError,
})
//@ApiResponse({ status: 401, description: 'Unauthorized.', type: () => LoginedDto})
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 201,
    type: () => UserEntity,
    isArray: true,
    description: 'Created User.',
  })
  @Post()
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @ApiResponse({
    status: 200,
    type: () => UserEntity,
    description: 'find All user.',
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiResponse({
    status: 200,
    type: () => UserEntity,
    description: 'find one user by id.',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne({ id });
  }

  @ApiResponse({
    status: 200,
    type: () => UserEntity,
    description: 'update user by id.',
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUsersDto: UpdateUsersDto) {
    return this.usersService.update(+id, updateUsersDto);
  }

  @ApiResponse({
    status: 200,
    type: () => UserEntity,
    description: 'remove user by id.',
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}
