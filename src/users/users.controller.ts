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
import {
  ApiBearerAuth,
  ApiBody,
  ApiTags,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { TokenExpiredError } from '../auth/dto/tokenExpiredError-dto';
import { LoginedDto } from '../auth/dto/logined-dto';
import { IdDto } from '../shared/dto/id-dto';
import { ParamsValidateFailDto } from '../shared/dto/paramsValidateFail-dto';

@ApiBearerAuth()
@ApiTags('Users')
@ApiResponse({
  status: 401,
  description: 'Unauthorized OR token expired',
  content: {
    TokenExpiredError: {
      schema: {
        $ref: getSchemaPath(TokenExpiredError),
      },
    },
    UnauthorizedError: {},
  },
})
@ApiResponse({
  status: 400,
  description: 'params validate fail',
  type: () => ParamsValidateFailDto,
})

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 201,
    type: () => UserEntity,
    description: 'Created User.',
  })
  @Post()
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @ApiResponse({
    status: 200,
    type: () => UserEntity,
    isArray: true,
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
  findOne(@Param() idDto: IdDto) {
    return this.usersService.findOne({ id: idDto.id });
  }

  @ApiResponse({
    status: 200,
    type: () => UserEntity,
    description: 'update user by id.',
  })
  @Patch(':id')
  update(@Param() idDto: IdDto, @Body() updateUsersDto: UpdateUsersDto) {
    return this.usersService.update({ id: idDto.id }, updateUsersDto);
  }

  @ApiResponse({
    status: 200,
    type: () => UserEntity,
    description: 'remove user by id.',
  })
  @Delete(':id')
  remove(@Param() idDto: IdDto) {
    return this.usersService.remove({ id: idDto.id });
  }
}
