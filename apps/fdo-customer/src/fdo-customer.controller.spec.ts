import { Test, TestingModule } from '@nestjs/testing';
import { FdoCustomerController } from './fdo-customer.controller';
import { FdoCustomerService } from './fdo-customer.service';

describe('FdoCustomerController', () => {
  let fdoCustomerController: FdoCustomerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FdoCustomerController],
      providers: [FdoCustomerService],
    }).compile();

    fdoCustomerController = app.get<FdoCustomerController>(FdoCustomerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fdoCustomerController.getHello()).toBe('Hello World!');
    });
  });
});
