import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AddressDto } from '../dtos/address/address.dto';
import { AddressInput } from '../dtos/address/address.input';
import { CustomerDto } from '../dtos/customer/customer.dto';
import { CustomerInput } from '../dtos/customer/customer.input';

@Injectable()
export class CustomersManagementFacade {
  public createCustomer(input: CustomerInput): Observable<CustomerDto> {
    console.log(JSON.stringify(input));
    throw new Error('Method not implemented.');
  }

  public updateCustomerById(
    customerId: string,
    input: CustomerInput,
  ): Observable<CustomerDto> {
    console.log(JSON.stringify(input));
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
    console.log(JSON.stringify(input));
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
    console.log(JSON.stringify(input));
    if (!Boolean(customerId)) {
      throw new Error('The customer id is required');
    }

    throw new Error('Method not implemented.');
  }
}
