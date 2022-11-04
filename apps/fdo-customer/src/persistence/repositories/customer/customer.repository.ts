import { Repository } from '@lib/fdo-database/mongodb/repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../../../domain/entities/customer/customer.entity';
import { Model } from 'mongoose';

@Injectable()
export class CustomerRepository extends Repository<Customer> {
  constructor(
    @InjectModel(Customer.name) private readonly _model: Model<Customer>,
  ) {
    super(_model);
  }
}
