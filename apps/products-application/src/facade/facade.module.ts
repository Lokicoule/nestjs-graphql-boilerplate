import { Module } from '@nestjs/common';
import { BusinessModule } from '~/business/business.module';
import { ProductsManagementFacade } from './frontoffice/products-management.facade';
import { ProductsSettingsManagementFacade } from './frontoffice/products-settings-management.facade';
import { SettingsManagementFacade } from './frontoffice/settings-management.facade';
import { ProductMapper } from './mapping/product.mapper';
import { PropertyMapper } from './mapping/property.mapper';
import { SettingMapper } from './mapping/setting.mapper';

@Module({
  imports: [BusinessModule],
  providers: [
    SettingsManagementFacade,
    ProductsSettingsManagementFacade,
    ProductsManagementFacade,
    SettingMapper,
    PropertyMapper,
    ProductMapper,
  ],
  exports: [
    SettingsManagementFacade,
    ProductsSettingsManagementFacade,
    ProductsManagementFacade,
  ],
})
export class FacadeModule {}
