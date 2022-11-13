import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FacadeModule } from '../facade/facade.module';
import { CustomExceptionFilter } from './filters/custom-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ApolloProviderModule } from './providers/apollo/apollo.provider.module';
import { CustomerSettingWritingResolver } from './resolvers/customer-setting/customer-setting-writing.resolver';
import { CustomerDeletingResolver } from './resolvers/customer/customer-deleting.resolver';
import { CustomerReadingResolver } from './resolvers/customer/customer-reading.resolver';
import { CustomerWritingResolver } from './resolvers/customer/customer-writing.resolver';
import { SettingReadingResolver } from './resolvers/setting/setting-reading.resolver';
import { SettingWritingResolver } from './resolvers/setting/setting-writing.resolver';

const customerResolvers = [
  CustomerReadingResolver,
  CustomerWritingResolver,
  CustomerDeletingResolver,
  CustomerSettingWritingResolver,
];

const settingResolvers = [SettingReadingResolver, SettingWritingResolver];

@Module({
  imports: [ApolloProviderModule, FacadeModule],
  providers: [
    ...customerResolvers,
    ...settingResolvers,
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
export class PresentationModule {}
