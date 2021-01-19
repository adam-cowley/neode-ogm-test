import { Test, TestingModule } from '@nestjs/testing';
import { NeodeService } from './neode.service';

describe('NeodeService', () => {
  let service: NeodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeodeService],
    }).compile();

    service = module.get<NeodeService>(NeodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
