import { Module } from '@nestjs/common';
import { FdoCustomerController } from './fdo-customer.controller';
import { FdoCustomerService } from './fdo-customer.service';

@Module({
  imports: [],
  controllers: [FdoCustomerController],
  providers: [FdoCustomerService],
})
export class FdoCustomerModule {}
