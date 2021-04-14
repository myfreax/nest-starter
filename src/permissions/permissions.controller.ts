import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionEntity, CheckIdDto } from './entities/permission.entity';
import { IdDto } from '../shared/dto/id-dto';
import { ControllerDecorator } from '../shared/decorators/controller-decorator';

@ControllerDecorator('Permissions')
@Controller()
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionEntity> {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  async findAll(): Promise<PermissionEntity[]> {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param() idDto: IdDto): Promise<PermissionEntity> {
    return this.permissionsService.findOne({ id: idDto.id });
  }

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

  @Delete(':id')
  remove(@Param() idDto: CheckIdDto): Promise<PermissionEntity> {
    return this.permissionsService.remove({ id: idDto.id });
  }
}
