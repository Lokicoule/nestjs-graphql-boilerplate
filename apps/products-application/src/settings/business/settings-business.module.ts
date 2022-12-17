import { Module } from '@nestjs/common';
import { SettingsPersistenceModule } from '../persistence/settings-persistence.module';
import { SettingsService } from './services/settings.service';

@Module({
  imports: [SettingsPersistenceModule],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsBusinessModule {}
