import { CustomExceptionFilter, LoggingInterceptor } from '@lib/fdo-graphql';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FacadeModule } from '../facade/facade.module';
import { ApolloProviderModule } from './providers/apollo/apollo.provider.module';
import { CognitoProviderModule } from './providers/cognito/cognito.provider.module';
import { ProductSettingWritingResolver } from './resolvers/product-setting/product-setting-writing.resolver';
import { ProductDeletingResolver } from './resolvers/product/product-deleting.resolver';
import { ProductReadingResolver } from './resolvers/product/product-reading.resolver';
import { ProductWritingResolver } from './resolvers/product/product-writing.resolver';
import { SettingReadingResolver } from './resolvers/setting/setting-reading.resolver';
import { SettingWritingResolver } from './resolvers/setting/setting-writing.resolver';

const productResolvers = [
  ProductReadingResolver,
  ProductWritingResolver,
  ProductDeletingResolver,
  ProductSettingWritingResolver,
];

const settingResolvers = [SettingReadingResolver, SettingWritingResolver];

@Module({
  imports: [ApolloProviderModule, CognitoProviderModule, FacadeModule],
  providers: [
    ...productResolvers,
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
