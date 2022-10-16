import { Module } from '@nestjs/common';
import { FdoOrderController } from './fdo-order.controller';
import { FdoOrderService } from './fdo-order.service';

@Module({
  imports: [],
  controllers: [FdoOrderController],
  providers: [FdoOrderService],
})
export class FdoOrderModule {}
