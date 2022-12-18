import { CustomExceptionFilter, LoggingInterceptor } from '@lib/fdo-graphql';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { ApolloProviderModule } from '../../apollo/apollo.provider.module';
import { CognitoProviderModule } from '../../cognito/cognito.provider.module';
import { SettingsFacadeModule } from '../facade/settings-facade.module';
import { SettingsReadingResolver } from './resolvers/settings-reading.resolver';
import { SettingsWritingResolver } from './resolvers/settings-writing.resolver';

const settingsResolver = [SettingsReadingResolver, SettingsWritingResolver];

@Module({
  imports: [ApolloProviderModule, CognitoProviderModule, SettingsFacadeModule],
  providers: [
    ...settingsResolver,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class SettingsPresentationModule {}
