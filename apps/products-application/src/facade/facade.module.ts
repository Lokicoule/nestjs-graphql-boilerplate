import { Module } from '@nestjs/common';
import { BusinessModule } from '~/business';
import {
  ProductsManagementFacade,
  ProductsSettingsManagementFacade,
  SettingsManagementFacade,
} from './frontoffice';
import { ProductMapper, PropertyMapper, SettingMapper } from './mapping';

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
