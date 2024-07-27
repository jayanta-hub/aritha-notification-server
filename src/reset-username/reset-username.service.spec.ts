import { Test, TestingModule } from '@nestjs/testing';
import { ResetUsernameService } from './reset-username.service';

describe('ResetUsernameService', () => {
  let service: ResetUsernameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResetUsernameService],
    }).compile();

    service = module.get<ResetUsernameService>(ResetUsernameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
