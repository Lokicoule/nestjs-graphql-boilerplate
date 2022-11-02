import { Module } from '@nestjs/common';
import { PersistenceModule } from '../persistence/persistence.module';
import { CustomerService } from './services/customer.service';
import { SettingService } from './services/setting.service';
import { CustomerSettingService } from './services/customer-setting.service';

@Module({
  imports: [PersistenceModule],
  providers: [CustomerService, SettingService, CustomerSettingService],
  exports: [CustomerService, SettingService, CustomerSettingService],
})
export class BusinessModule {}
