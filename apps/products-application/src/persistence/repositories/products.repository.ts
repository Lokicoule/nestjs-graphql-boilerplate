import { Repository } from '@lib/fdo-database/mongodb/repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '~/domain/entities';

@Injectable()
export class ProductsRepository extends Repository<Product> {
  constructor(
    @InjectModel(Product.name) private readonly _model: Model<Product>,
  ) {
    super(_model);
  }
}
