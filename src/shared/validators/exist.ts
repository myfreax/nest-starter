import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  Validate,
} from 'class-validator';
import { PrismaService } from '../prisma.service';
import { Tables } from '../prisma.service';

type Options = {
  /**
   * Specify in which table to find
   */
  table: Tables;

  /**
   * You need specify field name when decorate field not exist in table
   * example: roleId is require when you create user. But role table is not field roleId
   */
  field: string;

  /**
   * by default opposite is false, The vilidate value is exist return true. Otherwise return false.
   * The vilidate value is exist return false When opposite is true.
   */
  opposite: boolean;
};

@ValidatorConstraint({ name: 'valueIsExist', async: true })
@Injectable()
export class ValueIsExist implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}
  /**
   * By default the value exist the databse return true. otherwise retruen true
   * @param value T
   * @param args ValidationArguments
   * @returns Promise<boolean>
   */
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const options: Options = args.constraints[0];
    const bool = Boolean(
      await this.prisma[options.table.toString()].findUnique({
        where: { [options.field || args.property]: value },
      }),
    );
    if (options.opposite) {
      return !bool;
    }
    return bool;
  }

  defaultMessage(args: ValidationArguments) {
    const options: Options = args.constraints[0];
    return `${args.property} ${args.value} is ${
      options.opposite ? 'already' : 'not'
    } exist`;
  }
}

type ExistOption<T> = {
  /**
   * Specify in which table to find
   */
  table: Tables;
  /**
   * You need specify field name when decorate field not exist in table
   * example: roleId is require when you create user. But role table is not field roleId
   */
  field?: keyof T;
};

/**
 *  By default the value exist the databse return true. otherwise retruen true
 * @param table prisma
 * @param validationOptions
 * @returns PropertyDecorator
 */
export function IsExist<T>(
  options?: ExistOption<T>,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return Validate(
    ValueIsExist,
    [{ ...options, opposite: false }],
    validationOptions,
  );
}

export function IsNotExist<T>(
  options?: ExistOption<T>,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return Validate(
    ValueIsExist,
    [{ ...options, opposite: true }],
    validationOptions,
  );
}
