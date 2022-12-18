import { Module } from '@nestjs/common';
import { ProductsPresentationModule } from './presentation/products-presentation.module';

@Module({
  imports: [ProductsPresentationModule],
  exports: [ProductsPresentationModule],
})
export class ProductsModule {}
