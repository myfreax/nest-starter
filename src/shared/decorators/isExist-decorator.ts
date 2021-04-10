import { PrismaClient, User } from '@prisma/client';
import { ValidationOptions, Validate } from 'class-validator';
import { ValueIsExist } from '../validators/valueIsExist';
type IsExistOption<T> = {
  /**
   * Specify in which table to find
   */
  findInTable: Exclude<
  keyof PrismaClient,
  | '$connect'
  | '$disconnect'
  | '$use'
  | '$on'
  | '$queryRaw'
  | '$executeRaw'
  | '$transaction'
>;
  /**
   * by default opposite is false, The vilidate value is exist return true. Otherwise return false.
   * The vilidate value is exist return false When opposite is true.
   */
  opposite?: boolean;
  /**
   * You need specify field name when decorate field not exist in table
   * example: roleId is require when you create user. But role table is not field roleId
   */
  mapUniqueFieldName?: keyof T;
};
/**
 *  By default the value exist the databse return true. otherwise retruen true
 * @param table prisma
 * @param validationOptions
 * @returns PropertyDecorator
 */
export function IsExist<T>(
  options?: IsExistOption<T>,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return Validate(ValueIsExist, [options], validationOptions);
}
