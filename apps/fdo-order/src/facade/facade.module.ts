import { Module } from '@nestjs/common';
import { BusinessModule } from '../business/business.module';
import { OrdersManagementFacade } from './frontoffice/orders-management.facade';
import { SettingsManagementFacade } from './frontoffice/settings-management.facade';

@Module({
  imports: [BusinessModule],
  providers: [OrdersManagementFacade, SettingsManagementFacade],
  exports: [OrdersManagementFacade, SettingsManagementFacade],
})
export class FacadeModule {}
