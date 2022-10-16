import { Test, TestingModule } from '@nestjs/testing';
import { FdoLoggerService } from './fdo-logger.service';

describe('FdoLoggerService', () => {
  let service: FdoLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FdoLoggerService],
    }).compile();

    service = module.get<FdoLoggerService>(FdoLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
