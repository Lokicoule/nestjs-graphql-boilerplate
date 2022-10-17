import { Module } from '@nestjs/common';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [PresentationModule],
})
export class FdoCustomerModule {}
