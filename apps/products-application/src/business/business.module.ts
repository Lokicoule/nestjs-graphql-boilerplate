import { Module } from '@nestjs/common';
import { PersistenceModule } from '../persistence/persistence.module';
import { ProductSettingsService } from './services/product-settings.service';
import { SettingsService } from './services/settings.service';
import { ProductsService } from './services/products.service';

@Module({
  imports: [PersistenceModule],
  providers: [SettingsService, ProductSettingsService, ProductsService],
  exports: [SettingsService, ProductSettingsService, ProductsService],
})
export class BusinessModule {}
