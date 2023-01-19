import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainModule } from '~/domain';
import {
  Product,
  ProductSchema,
  Setting,
  SettingSchema,
} from '~/domain/entities';
import { MongooseProviderModule } from './providers/mongoose.provider.module';
import { ProductsRepository, SettingsRepository } from './repositories';

@Module({
  imports: [
    DomainModule,
    MongooseProviderModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Setting.name, schema: SettingSchema },
    ]),
  ],
  providers: [SettingsRepository, ProductsRepository],
  exports: [SettingsRepository, ProductsRepository],
})
export class PersistenceModule {}
