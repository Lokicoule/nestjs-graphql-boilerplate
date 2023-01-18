import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '~/domain/entities/product.entity';
import { Setting, SettingSchema } from '~/domain/entities/setting.entity';
import { MongooseProviderModule } from './providers/mongoose.provider.module';
import { ProductsRepository } from './repositories/products.repository';
import { SettingsRepository } from './repositories/settings.repository';

@Module({
  imports: [
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
