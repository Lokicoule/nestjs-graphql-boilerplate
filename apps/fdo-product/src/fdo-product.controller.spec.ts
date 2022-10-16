import { Test, TestingModule } from '@nestjs/testing';
import { FdoProductController } from './fdo-product.controller';
import { FdoProductService } from './fdo-product.service';

describe('FdoProductController', () => {
  let fdoProductController: FdoProductController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FdoProductController],
      providers: [FdoProductService],
    }).compile();

    fdoProductController = app.get<FdoProductController>(FdoProductController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fdoProductController.getHello()).toBe('Hello World!');
    });
  });
});
