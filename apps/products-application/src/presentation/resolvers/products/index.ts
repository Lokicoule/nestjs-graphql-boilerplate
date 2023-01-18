import { ProductsDeletingResolver } from './products-deleting.resolver';
import { ProductsReadingResolver } from './products-reading.resolver';
import { ProductsWritingResolver } from './products-writing.resolver';

export const productsResolvers = [
  ProductsDeletingResolver,
  ProductsReadingResolver,
  ProductsWritingResolver,
];
