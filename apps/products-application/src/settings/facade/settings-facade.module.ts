import { Module } from '@nestjs/common';
import { SettingsBusinessModule } from '../business/settings-business.module';
import { SettingsManagementFacade } from './frontoffice/settings-management.facade';
import { PropertyMapper } from './mapping/property.mapper';
import { SettingMapper } from './mapping/setting.mapper';

@Module({
  imports: [SettingsBusinessModule],
  providers: [SettingsManagementFacade, SettingMapper, PropertyMapper],
  exports: [SettingsManagementFacade],
})
export class SettingsFacadeModule {}
