import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from 'apps/fdo-customer/src/domain/entities/customer.entity';
import { Address } from 'cluster';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel(Customer.name)
    private readonly _customerModel: Model<Customer>,
  ) {}

  createCustomer(customer: Customer): Observable<Customer> {
    return from(this._customerModel.create(customer));
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    throw new Error('Method not implemented.');
  }

  removeCustomer(): Observable<Customer> {
    throw new Error('Method not implemented.');
  }

  findCustomer(): Observable<Customer> {
    throw new Error('Method not implemented.');
  }

  findAllCustomers(): Observable<Customer[]> {
    throw new Error('Method not implemented.');
  }

  addCustomerAddress(): Observable<Address> {
    throw new Error('Method not implemented.');
  }

  removeCustomerAddress(): Observable<Address> {
    throw new Error('Method not implemented.');
  }

  updateCustomerAddress(): Observable<Address> {
    throw new Error('Method not implemented.');
  }
}
