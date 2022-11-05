import { Module } from '@nestjs/common';
import { BusinessModule } from '../business/business.module';
import { ProductsManagementFacade } from './frontoffice/products-management.facade';
import { SettingsManagementFacade } from './frontoffice/settings-management.facade';

@Module({
  imports: [BusinessModule],
  providers: [ProductsManagementFacade, SettingsManagementFacade],
  exports: [ProductsManagementFacade, SettingsManagementFacade],
})
export class FacadeModule {}
