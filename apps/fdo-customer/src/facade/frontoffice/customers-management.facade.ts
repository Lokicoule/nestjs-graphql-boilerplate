import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomerDto } from '../dtos/customer/customer.dto';
import { CreateAddressInput } from '../dtos/address/inputs/create-address.input';
import { CreateCustomerInput } from '../dtos/customer/inputs/create-customer.input';
import { UpdateAddressInput } from '../dtos/address/inputs/update-address.input';
import { UpdateCustomerInput } from '../dtos/customer/inputs/update-customer.input';

@Injectable()
export class CustomersManagementFacade {
  public createCustomer(
    createCustomerInput: CreateCustomerInput,
  ): Observable<CustomerDto> {
    throw new Error('Method not implemented.');
  }

  public updateCustomerById(
    updateCustomerInput: UpdateCustomerInput,
  ): Observable<CustomerDto> {
    throw new Error('Method not implemented.');
  }

  public removeCustomerById(id: string): Observable<CustomerDto> {
    throw new Error('Method not implemented.');
  }

  public findCustomerById(id: string): Observable<CustomerDto> {
    throw new Error('Method not implemented.');
  }

  public findAllCustomers(): Observable<CustomerDto[]> {
    throw new Error('Method not implemented.');
  }

  public addCustomerAddress(
    address: CreateAddressInput,
  ): Observable<CustomerDto> {
    throw new Error('Method not implemented.');
  }

  public removeCustomerAddressById(id: string): Observable<CustomerDto> {
    throw new Error('Method not implemented.');
  }

  public updateCustomerAddress(
    address: UpdateAddressInput,
  ): Observable<CustomerDto> {
    throw new Error('Method not implemented.');
  }
}
