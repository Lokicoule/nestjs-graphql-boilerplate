import { Module } from '@nestjs/common';
import { ProductsPersistenceModule } from '../persistence/products-persistence.module';
import { ProductsSettingsService } from './services/products-settings.service';
import { ProductsService } from './services/products.service';
import { SettingsBusinessModule } from '../../settings/business/settings-business.module';

@Module({
  imports: [ProductsPersistenceModule, SettingsBusinessModule],
  providers: [ProductsService, ProductsSettingsService],
  exports: [ProductsService, ProductsSettingsService],
})
export class ProductsBusinessModule {}
