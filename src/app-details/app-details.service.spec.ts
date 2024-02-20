import { Test, TestingModule } from '@nestjs/testing';
import { AppDetailsService } from './app-details.service';

describe('AppDetailsService', () => {
  let service: AppDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppDetailsService],
    }).compile();

    service = module.get<AppDetailsService>(AppDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
