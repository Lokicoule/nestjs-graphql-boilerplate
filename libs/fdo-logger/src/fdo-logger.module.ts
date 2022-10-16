import { Module } from '@nestjs/common';
import { FdoLoggerService } from './fdo-logger.service';

@Module({
  providers: [FdoLoggerService],
  exports: [FdoLoggerService],
})
export class FdoLoggerModule {}
