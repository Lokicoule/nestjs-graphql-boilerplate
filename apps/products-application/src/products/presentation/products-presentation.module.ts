import { CustomExceptionFilter, LoggingInterceptor } from '@lib/fdo-graphql';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { ApolloProviderModule } from '../../apollo/apollo.provider.module';
import { CognitoProviderModule } from '../../cognito/cognito.provider.module';

import { ProductsFacadeModule } from '../facade/products-facade.module';

import { ProductsReadingResolver } from './resolvers/products-reading.resolver';
import { ProductsDeletingResolver } from './resolvers/products-deleting.resolver';
import { ProductsWritingResolver } from './resolvers/products-writing.resolver';

const productsResolvers = [
  ProductsReadingResolver,
  ProductsWritingResolver,
  ProductsDeletingResolver,
];

@Module({
  imports: [ApolloProviderModule, CognitoProviderModule, ProductsFacadeModule],
  providers: [
    ...productsResolvers,
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
export class ProductsPresentationModule {}
