import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Controller } from '../shared/decorators/controller';
import { Find } from '../shared/decorators/find';
import { RoleEntity } from './entities/role.entity';
import { IdDto } from '../shared/dto/id.dto';
import { ApiResponse } from '@nestjs/swagger';

Controller('Roles');
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Find({
    description: 'Find all role',
    type: () => RoleEntity,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Find({ type: RoleEntity, description: 'Find role by id' })
  @Get(':id')
  findOne(@Param() idDto: IdDto) {
    return this.rolesService.findOne({ id: idDto.id });
  }

  @ApiResponse({
    status: 200,
    type: () => RoleEntity,
    description: 'Update role by id.',
  })
  @Patch(':id')
  update(@Param() idDto: IdDto, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update({ id: idDto.id }, updateRoleDto);
  }

  @ApiResponse({
    status: 200,
    type: () => RoleEntity,
    description: 'Remove role by id.',
  })
  @Delete(':id')
  remove(@Param() idDto: IdDto) {
    return this.rolesService.remove({ id: idDto.id });
  }
}
