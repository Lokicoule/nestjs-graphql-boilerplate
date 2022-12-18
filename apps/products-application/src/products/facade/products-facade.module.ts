import { Module } from '@nestjs/common';
import { SettingsFacadeModule } from '../../settings/facade/settings-facade.module';
import { ProductsBusinessModule } from '../business/products-business.module';
import { ProductsManagementFacade } from './frontoffice/products-management.facade';
import { ProductMapper } from './mapping/product.mapper';

@Module({
  imports: [ProductsBusinessModule, SettingsFacadeModule],
  providers: [ProductsManagementFacade, ProductMapper],
  exports: [ProductsManagementFacade],
})
export class ProductsFacadeModule {}
