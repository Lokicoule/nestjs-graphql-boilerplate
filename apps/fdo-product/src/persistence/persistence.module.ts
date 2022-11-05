import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Product,
  ProductSchema,
} from '../domain/entities/product/product.entity';
import {
  Setting,
  SettingSchema,
} from '../domain/entities/setting/setting.entity';
import { MongoDBProviderModule } from './providers/mongodb/mongodb.provider.module';
import { ProductRepository } from './repositories/product/product.repository';
import { SettingRepository } from './repositories/setting/setting.repository';

@Module({
  imports: [
    MongoDBProviderModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Setting.name, schema: SettingSchema },
    ]),
  ],
  providers: [ProductRepository, SettingRepository],
  exports: [ProductRepository, SettingRepository],
})
export class PersistenceModule {}
