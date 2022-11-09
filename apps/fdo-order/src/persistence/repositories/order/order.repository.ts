import { Repository } from '@lib/fdo-database/mongodb/repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../../../domain/entities/order/order.entity';
import { Model } from 'mongoose';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(@InjectModel(Order.name) private readonly _model: Model<Order>) {
    super(_model);
  }
}
