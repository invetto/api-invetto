import { Test, TestingModule } from '@nestjs/testing';
import { WeddingInformationController } from './wedding_information.controller';

describe('WeddingInformationController', () => {
  let controller: WeddingInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeddingInformationController],
    }).compile();

    controller = module.get<WeddingInformationController>(WeddingInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
