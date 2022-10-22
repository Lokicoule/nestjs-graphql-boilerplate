import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { CustomerService } from '../../business/services/customer/customer.service';
import { AddressInput } from '../dtos/address/address.input';
import { CustomerDto } from '../dtos/customer/customer.dto';
import { CustomerInput } from '../dtos/customer/customer.input';
import { CustomerMapper } from '../mapping/customer.mapper';

@Injectable()
export class CustomersManagementFacade {
  constructor(private readonly _customerService: CustomerService) {}

  public createCustomer(input: CustomerInput): Observable<CustomerDto> {
    return this._customerService
      .createCustomer(CustomerMapper.mapToEntity(input))
      .pipe(map(CustomerMapper.mapToDto));
  }

  public updateCustomerById(
    customerId: string,
    input: CustomerInput,
  ): Observable<CustomerDto> {
    if (!Boolean(customerId)) {
      throw new Error('The customer id is required');
    }
    throw new Error('Method not implemented.');
  }

  public removeCustomerById(customerId: string): Observable<CustomerDto> {
    if (!Boolean(customerId)) {
      throw new Error('The customer id is required');
    }
    throw new Error('Method not implemented.');
  }

  public findCustomerById(customerId: string): Observable<CustomerDto> {
    if (!Boolean(customerId)) {
      throw new Error('The customer id is required');
    }
    throw new Error('Method not implemented.');
  }

  public findAllCustomers(): Observable<CustomerDto[]> {
    throw new Error('Method not implemented.');
  }

  public addAddress(
    customerId: string,
    input: AddressInput,
  ): Observable<CustomerDto> {
    if (!Boolean(customerId)) {
      throw new Error('The customer id is required');
    }

    throw new Error('Method not implemented.');
  }

  public removeAddressById(
    customerId: string,
    addressId: string,
  ): Observable<CustomerDto> {
    if (!Boolean(customerId)) {
      throw new Error('The customer id is required');
    }
    if (!Boolean(addressId)) {
      throw new Error('The address id is required');
    }

    throw new Error('Method not implemented.');
  }

  public updateAddress(
    customerId: string,
    input: AddressInput,
  ): Observable<CustomerDto> {
    if (!Boolean(customerId)) {
      throw new Error('The customer id is required');
    }

    throw new Error('Method not implemented.');
  }
}
