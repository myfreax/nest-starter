import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionEntity, CheckIdDto } from './entities/permission.entity';
import { IdDto } from '../shared/dto/id.dto';
import { Controller } from '../shared/decorators/controller';
import { Find } from '../shared/decorators/find';
import { DuplicatePipe } from '../shared/pipes/duplicate.pipe';
import { ApiResponse } from '@nestjs/swagger';

@Controller('Permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}
  @ApiResponse({
    status: 201,
    type: () => PermissionEntity,
    description: 'Create User.',
  })
  @UsePipes(DuplicatePipe)
  @Post()
  create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionEntity> {
    return this.permissionsService.create(createPermissionDto);
  }

  @Find({
    description: 'Find all permission',
    type: () => PermissionEntity,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<PermissionEntity[]> {
    return this.permissionsService.findAll();
  }

  @Find({
    description: 'Find permission by id',
    type: () => PermissionEntity,
  })
  @Get(':id')
  findOne(@Param() idDto: IdDto): Promise<PermissionEntity> {
    return this.permissionsService.findOne({ id: idDto.id });
  }

  @ApiResponse({
    status: 200,
    type: () => PermissionEntity,
    description: 'Update user by id.',
  })
  @Patch(':id')
  update(
    @Param() idDto: CheckIdDto,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<PermissionEntity> {
    return this.permissionsService.update(
      { id: idDto.id },
      updatePermissionDto,
    );
  }

  @ApiResponse({
    status: 200,
    type: () => PermissionEntity,
    description: 'Remove user by id.',
  })
  @Delete(':id')
  remove(@Param() idDto: CheckIdDto): Promise<PermissionEntity> {
    return this.permissionsService.remove({ id: idDto.id });
  }
}
