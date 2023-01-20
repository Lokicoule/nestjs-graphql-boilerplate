import { Module } from '@nestjs/common';
import { PersistenceModule } from '~/persistence';
import {
  CustomerSettingsService,
  CustomersService,
  SettingsService,
} from './services';

@Module({
  imports: [PersistenceModule],
  providers: [SettingsService, CustomerSettingsService, CustomersService],
  exports: [SettingsService, CustomerSettingsService, CustomersService],
})
export class BusinessModule {}
