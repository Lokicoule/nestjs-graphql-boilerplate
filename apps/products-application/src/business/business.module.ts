import { Module } from '@nestjs/common';
import { PersistenceModule } from '~/persistence';
import {
  ProductSettingsService,
  ProductsService,
  SettingsService,
} from './services';

@Module({
  imports: [PersistenceModule],
  providers: [SettingsService, ProductSettingsService, ProductsService],
  exports: [SettingsService, ProductSettingsService, ProductsService],
})
export class BusinessModule {}
