import { Module } from '@nestjs/common';

import { CognitoProviderModule } from '../../cognito/cognito.provider.module';

import { ProductsFacadeModule } from '../facade/products-facade.module';

import { ProductsDeletingResolver } from './resolvers/products-deleting.resolver';
import { ProductsReadingResolver } from './resolvers/products-reading.resolver';
import { ProductsWritingResolver } from './resolvers/products-writing.resolver';

const productsResolvers = [
  ProductsReadingResolver,
  ProductsWritingResolver,
  ProductsDeletingResolver,
];

@Module({
  imports: [CognitoProviderModule, ProductsFacadeModule],
  providers: [...productsResolvers],
})
export class ProductsPresentationModule {}
