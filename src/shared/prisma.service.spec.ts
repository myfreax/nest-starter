import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });
  afterEach(async () => {
    service.onModuleDestroy();
  });

  it('prisma.service should be defined', () => {
    expect(service).toBeDefined();
  });
  it('prisma.user should be defined', () => {
    expect(service.user).toBeDefined();
  });
  it('prisma.role should be defined', () => {
    expect(service.role).toBeDefined();
  });
  it('prisma.permission should be defined', () => {
    expect(service.permission).toBeDefined();
  });
});
