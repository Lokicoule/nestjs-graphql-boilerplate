import { Module } from '@nestjs/common';
import { FdoServiceService } from './fdo-service.service';

@Module({
  providers: [FdoServiceService],
  exports: [FdoServiceService],
})
export class FdoServiceModule {}
