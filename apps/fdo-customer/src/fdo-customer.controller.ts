import { Controller, Get } from '@nestjs/common';
import { FdoCustomerService } from './fdo-customer.service';

@Controller()
export class FdoCustomerController {
  constructor(private readonly fdoCustomerService: FdoCustomerService) {}

  @Get()
  getHello(): string {
    return this.fdoCustomerService.getHello();
  }
}
