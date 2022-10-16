import { Test, TestingModule } from '@nestjs/testing';
import { FdoGraphqlService } from './fdo-graphql.service';

describe('FdoGraphqlService', () => {
  let service: FdoGraphqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FdoGraphqlService],
    }).compile();

    service = module.get<FdoGraphqlService>(FdoGraphqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
