import { Test, TestingModule } from '@nestjs/testing';
import { ResetUsernameController } from './reset-username.controller';

describe('ResetUsernameController', () => {
  let controller: ResetUsernameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResetUsernameController],
    }).compile();

    controller = module.get<ResetUsernameController>(ResetUsernameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
