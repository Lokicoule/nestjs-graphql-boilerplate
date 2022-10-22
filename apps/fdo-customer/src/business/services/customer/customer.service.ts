import { Injectable } from '@nestjs/common';
import { Customer } from 'apps/fdo-customer/src/domain/entities/customer.entity';
import { CustomerRepository } from 'apps/fdo-customer/src/persistence/repositories/customer/customer.repository';
import { Address } from 'cluster';
import { map, Observable, throwIfEmpty } from 'rxjs';

@Injectable()
export class CustomerService {
  constructor(private readonly _customerRepository: CustomerRepository) {}

  createCustomer(customer: Customer): Observable<Customer> {
    return this._customerRepository.createCustomer(customer).pipe(
      throwIfEmpty(() => {
        throw new Error('Customer could not be created');
      }),
    );
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

  addCustomerAddress(address: Address): Observable<Address> {
    throw new Error('Method not implemented.');
  }

  removeCustomerAddress(): Observable<Address> {
    throw new Error('Method not implemented.');
  }

  updateCustomerAddress(address: Address): Observable<Address> {
    throw new Error('Method not implemented.');
  }
}
