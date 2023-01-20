import { Module } from '@nestjs/common';
import { BusinessModule } from '~/business';
import {
  CustomersManagementFacade,
  CustomersSettingsManagementFacade,
  SettingsManagementFacade,
} from './frontoffice';
import { CustomerMapper, PropertyMapper, SettingMapper } from './mapping';

@Module({
  imports: [BusinessModule],
  providers: [
    SettingsManagementFacade,
    CustomersSettingsManagementFacade,
    CustomersManagementFacade,
    SettingMapper,
    PropertyMapper,
    CustomerMapper,
  ],
  exports: [
    SettingsManagementFacade,
    CustomersSettingsManagementFacade,
    CustomersManagementFacade,
  ],
})
export class FacadeModule {}
