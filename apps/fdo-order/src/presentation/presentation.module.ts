import { CustomExceptionFilter, LoggingInterceptor } from '@lib/fdo-graphql';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FacadeModule } from '../facade/facade.module';
import { ApolloProviderModule } from './providers/apollo/apollo.provider.module';
import { OrderSettingWritingResolver } from './resolvers/order-setting/order-setting-writing.resolver';
import { OrderDeletingResolver } from './resolvers/order/order-deleting.resolver';
import { OrderReadingResolver } from './resolvers/order/order-reading.resolver';
import { OrderWritingResolver } from './resolvers/order/order-writing.resolver';
import { SettingReadingResolver } from './resolvers/setting/setting-reading.resolver';
import { SettingWritingResolver } from './resolvers/setting/setting-writing.resolver';

const orderResolvers = [
  OrderReadingResolver,
  OrderWritingResolver,
  OrderDeletingResolver,
  OrderSettingWritingResolver,
];

const settingResolvers = [SettingReadingResolver, SettingWritingResolver];

@Module({
  imports: [ApolloProviderModule, FacadeModule],
  providers: [
    ...orderResolvers,
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
