import { Repository } from '@lib/fdo-database/mongodb/repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '~/domain/entities';

@Injectable()
export class CustomersRepository extends Repository<Customer> {
  constructor(
    @InjectModel(Customer.name) private readonly _model: Model<Customer>,
  ) {
    super(_model);
  }
}
