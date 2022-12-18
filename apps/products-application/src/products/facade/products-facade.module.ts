import { Module } from '@nestjs/common';
import { ProductsBusinessModule } from '../business/products-business.module';
import { ProductsManagementFacade } from './frontoffice/products-management.facade';
import { ProductMapper } from './mapping/product.mapper';

@Module({
  imports: [ProductsBusinessModule],
  providers: [ProductsManagementFacade, ProductMapper],
  exports: [ProductsManagementFacade],
})
export class ProductsFacadeModule {}
