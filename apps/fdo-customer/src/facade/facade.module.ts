import { Module } from '@nestjs/common';
import { BusinessModule } from '../business/business.module';
import { CustomersManagementFacade } from './frontoffice/customers-management.facade';
import { SettingsManagementFacade } from './frontoffice/settings-management.facade';

@Module({
  imports: [BusinessModule],
  providers: [CustomersManagementFacade, SettingsManagementFacade],
  exports: [CustomersManagementFacade, SettingsManagementFacade],
})
export class FacadeModule {}
