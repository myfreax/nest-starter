import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ISUNIQUE } from '../decorators/unique';
import { PrismaService } from '../prisma.service';
/**
 * check give table record is already exist
 * if record exist return http status code 400
 * otherwise return value
 */
@Injectable()
export class DuplicatePipe implements PipeTransform {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const option = this.reflector.get<{ table: string; field: string }>(
      ISUNIQUE,
      metadata.metatype,
    );
    if (option.table && option.field) {
      const res = await this.prisma[option.table].findUnique({
        where: { [option.field]: value },
      });
      if (Boolean(res)) {
        throw new BadRequestException([`${option.table} already exist`]);
      }
    } else {
      // You must Setmeatadata for  metadata.metatype
    }
    return value;
  }
}
