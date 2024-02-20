import { Test, TestingModule } from '@nestjs/testing';
import { AppDetailsController } from './app-details.controller';

describe('AppDetailsController', () => {
  let controller: AppDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppDetailsController],
    }).compile();

    controller = module.get<AppDetailsController>(AppDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
