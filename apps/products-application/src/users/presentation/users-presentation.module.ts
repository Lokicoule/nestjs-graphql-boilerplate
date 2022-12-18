import { CustomExceptionFilter, LoggingInterceptor } from '@lib/fdo-graphql';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { ApolloProviderModule } from '../../apollo/apollo.provider.module';
import { CognitoProviderModule } from '../../cognito/cognito.provider.module';
import { ProductsFacadeModule } from '../../products/facade/products-facade.module';
import { SettingsFacadeModule } from '../../settings/facade/settings-facade.module';
import { UsersReadingResolver } from './resolvers/users-reading.resolver';

const usersResolvers = [UsersReadingResolver];

@Module({
  imports: [
    ApolloProviderModule,
    CognitoProviderModule,
    ProductsFacadeModule,
    SettingsFacadeModule,
  ],
  providers: [
    ...usersResolvers,
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
export class UsersPresentationModule {}
