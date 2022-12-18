import { Module } from '@nestjs/common';
import { SettingsBusinessModule } from '../business/settings-business.module';
import { SettingsManagementFacade } from './frontoffice/settings-management.facade';

@Module({
  imports: [SettingsBusinessModule],
  providers: [SettingsManagementFacade],
  exports: [SettingsManagementFacade],
})
export class SettingsFacadeModule {}
