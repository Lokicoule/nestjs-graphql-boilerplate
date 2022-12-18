import { Module } from '@nestjs/common';
import { SettingsPresentationModule } from './presentation/settings-presentation.module';

@Module({
  imports: [SettingsPresentationModule],
  exports: [SettingsPresentationModule],
})
export class SettingsModule {}
