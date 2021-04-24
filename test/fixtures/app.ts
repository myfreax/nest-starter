import { JwtService } from '@nestjs/jwt';
import { TestingModule, Test } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import { AppModule } from '../../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { CreateUsersDto } from '../../src/users/dto/create-users.dto';
import { UserEntity } from '../../src/users/entities/user.entity';
import { PrismaService } from '../../src/shared/prisma.service';

/**
 *
 * @returns INestApplication
 */
export const createApp = async (): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app: INestApplication = moduleFixture.createNestApplication();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        strategy: 'exposeAll',
        excludeExtraneousValues: true,
      },
    }),
  );
  const appInstance = await app.init();
  return appInstance;
};

/**
 *
 * @param app
 * @param payload
 * @returns string
 */
export const createToken = (
  app: INestApplication,
  payload?: Record<string, unknown>,
): string => {
  const jwt = app.get<JwtService>(JwtService);
  payload = payload
    ? payload
    : { email: 'web@myfreax.com', userId: 1, roleId: 1 };
  return jwt.sign(payload, { expiresIn: '24h' });
};

/**
 *
 * @param app
 * @param createUsersDto
 * @returns UserEntity
 */
export const createUser = async (
  app: INestApplication,
  createUsersDto?: CreateUsersDto,
): Promise<UserEntity> => {
  const email = 'web@myfreax.com';
  let user: UserEntity;
  const prisma = app.get<PrismaService>(PrismaService);
  user = await prisma.user.findUnique({
    where: {
      email: (createUsersDto && createUsersDto.email) || email,
    },
  });

  if (!user) {
    const data: CreateUsersDto = {
      email,
      roleId: 1,
      password: 'myfreax',
      ...createUsersDto,
    };
    user = await prisma.user.create({ data });
  }
  return user;
};
/**
 *
 * @param app
 * @param user
 * @returns Promise<UserEntity | null>
 */
export const delUser = async (
  app: INestApplication,
  user: UserEntity,
): Promise<UserEntity | null> => {
  const prisma = app.get<PrismaService>(PrismaService);
  try {
    return prisma.user.delete({ where: { id: user.id } });
  } catch (error) {
    return null;
  }
};
