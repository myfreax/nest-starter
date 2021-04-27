import { SetMetadata } from '@nestjs/common';
import { Table } from '../prisma.service';
export const ISUNIQUE = 'ISUNIQUE';
export type IsUniqueOption<T> = {
  table: Table;
  field: keyof T;
};

export function IsUnique<T>(option: IsUniqueOption<T>): ClassDecorator {
  return SetMetadata(ISUNIQUE, option);
}
