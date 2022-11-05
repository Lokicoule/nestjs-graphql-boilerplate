import { Repository } from '@lib/fdo-database/mongodb/repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../../domain/entities/product/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(
    @InjectModel(Product.name) private readonly _model: Model<Product>,
  ) {
    super(_model);
  }
}
