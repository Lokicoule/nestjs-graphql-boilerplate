import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseProviderModule } from '../../mongoose/mongoose.provider.module';
import { Product, ProductSchema } from '../domain/entities/product.entity';
import { ProductsRepository } from './repositories/products.repository';

@Module({
  imports: [
    MongooseProviderModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductsRepository],
  exports: [ProductsRepository],
})
export class ProductsPersistenceModule {}
