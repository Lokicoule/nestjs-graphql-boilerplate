import { Controller, Get } from '@nestjs/common';
import { FdoOrderService } from './fdo-order.service';

@Controller()
export class FdoOrderController {
  constructor(private readonly fdoOrderService: FdoOrderService) {}

  @Get()
  getHello(): string {
    return this.fdoOrderService.getHello();
  }
}
