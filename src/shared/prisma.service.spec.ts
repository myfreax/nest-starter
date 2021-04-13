import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });
  afterAll(async () => {
    module.close();
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
