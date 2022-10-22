import { Module } from '@nestjs/common';
import { PersistenceModule } from '../persistence/persistence.module';
import { CustomerService } from './services/customer/customer.service';

@Module({
  imports: [PersistenceModule],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class BusinessModule {}
