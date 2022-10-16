import { Test, TestingModule } from '@nestjs/testing';
import { FdoOrderController } from './fdo-order.controller';
import { FdoOrderService } from './fdo-order.service';

describe('FdoOrderController', () => {
  let fdoOrderController: FdoOrderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FdoOrderController],
      providers: [FdoOrderService],
    }).compile();

    fdoOrderController = app.get<FdoOrderController>(FdoOrderController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fdoOrderController.getHello()).toBe('Hello World!');
    });
  });
});
