import { Test, TestingModule } from '@nestjs/testing';
import { FdoServiceService } from './fdo-service.service';

describe('FdoServiceService', () => {
  let service: FdoServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FdoServiceService],
    }).compile();

    service = module.get<FdoServiceService>(FdoServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
