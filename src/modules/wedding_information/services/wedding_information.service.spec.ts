import { Test, TestingModule } from '@nestjs/testing';
import { WeddingInformationService } from './wedding_information.service';

describe('WeddingInformationService', () => {
  let service: WeddingInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeddingInformationService],
    }).compile();

    service = module.get<WeddingInformationService>(WeddingInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
