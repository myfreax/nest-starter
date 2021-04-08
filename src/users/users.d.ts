import { User } from '@prisma/client';
declare type CreateAndUpdateUser = Omit<User, 'id'>;
