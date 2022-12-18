import { Module } from '@nestjs/common';

import { CognitoProviderModule } from '../../cognito/cognito.provider.module';
import { SettingsFacadeModule } from '../facade/settings-facade.module';
import { SettingsReadingResolver } from './resolvers/settings-reading.resolver';
import { SettingsWritingResolver } from './resolvers/settings-writing.resolver';

const settingsResolver = [SettingsReadingResolver, SettingsWritingResolver];

@Module({
  imports: [CognitoProviderModule, SettingsFacadeModule],
  providers: [...settingsResolver],
})
export class SettingsPresentationModule {}
