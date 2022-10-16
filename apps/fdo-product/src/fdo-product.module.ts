import { Module } from '@nestjs/common';
import { FdoProductController } from './fdo-product.controller';
import { FdoProductService } from './fdo-product.service';

@Module({
  imports: [],
  controllers: [FdoProductController],
  providers: [FdoProductService],
})
export class FdoProductModule {}
