import { Controller, Get } from '@nestjs/common';
import { FdoProductService } from './fdo-product.service';

@Controller()
export class FdoProductController {
  constructor(private readonly fdoProductService: FdoProductService) {}

  @Get()
  getHello(): string {
    return this.fdoProductService.getHello();
  }
}
