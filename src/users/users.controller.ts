import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
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
import { CheckIdDto, IdDto } from '../shared/dto/id-dto';
import { ParamsValidateFailDto } from '../shared/dto/paramsValidateFail-dto';
import { NotFoundDto } from '../shared/dto/notFound-dto';
import { Inject } from '@nestjs/common';
import { PrismaService, Tables } from '../shared/prisma.service';
import { CheckIdPipe } from '../shared/pipes/checkId.piple';
export const CheckId = (table: string) => {
  const injectService = Inject(PrismaService);
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor => {
    const originalMethod = descriptor.value;
    injectService(target, 'prisma');
    descriptor.value = async function (...args) {
      console.info(args);
      const prisma: PrismaService = this.prisma;
      const user = await prisma.user.findUnique({ where: { id: 1 } });
      if (user) {
        return originalMethod.apply(this, args);
      }
    };
    return descriptor;
  };
};
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
  @ApiResponse({
    status: 404,
    type: () => NotFoundDto,
    description: 'find all user.',
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
  @ApiResponse({
    status: 404,
    type: () => NotFoundDto,
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
  update(@Param() idDto: CheckIdDto, @Body() updateUsersDto: UpdateUsersDto) {
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
