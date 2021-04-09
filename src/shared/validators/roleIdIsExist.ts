import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PrismaService } from '../prisma.service';

@ValidatorConstraint({ name: 'roleIdIsExist', async: true })
@Injectable()
export class RoleIdIsExist implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}
  async validate(value: number, args: ValidationArguments): Promise<boolean> {
    if (typeof value == 'number') {
      return Boolean(
        await this.prisma.role.findUnique({ where: { id: value } }),
      );
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.targetName} ${args.value} is not exist`;
  }
}
