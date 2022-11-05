import { Module } from '@nestjs/common';
import { PersistenceModule } from '../persistence/persistence.module';
import { ProductService } from './services/product.service';
import { SettingService } from './services/setting.service';
import { ProductSettingService } from './services/product-setting.service';

@Module({
  imports: [PersistenceModule],
  providers: [ProductService, SettingService, ProductSettingService],
  exports: [ProductService, SettingService, ProductSettingService],
})
export class BusinessModule {}
