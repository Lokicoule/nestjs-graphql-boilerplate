import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { CustomerService } from '../../business/services/customer.service';
import { CustomerDto } from '../dtos/customer/customer.dto';
import { CustomerCreateInput } from '../dtos/customer/inputs/customer-create.input';
import { CustomerCriteriaInput } from '../dtos/customer/inputs/customer-criteria.input';
import { CustomerUpdateInput } from '../dtos/customer/inputs/customer-update.input';
import { CustomerMapper } from '../mapping/customer/customer.mapper';

@Injectable()
export class CustomersManagementFacade {
  constructor(private readonly _customerService: CustomerService) {}

  public createCustomer(input: CustomerCreateInput): Observable<CustomerDto> {
    return this._customerService
      .createCustomer(CustomerMapper.mapToEntity(input))
      .pipe(map(CustomerMapper.mapToDto));
  }

  public updateCustomer(input: CustomerUpdateInput): Observable<CustomerDto> {
    return this._customerService
      .updateCustomer(CustomerMapper.mapToEntity(input))
      .pipe(map(CustomerMapper.mapToDto));
  }

  public removeCustomerById(customerId: string): Observable<CustomerDto> {
    return this._customerService
      .removeCustomerById(customerId)
      .pipe(map(CustomerMapper.mapToDto));
  }

  public removeCustomersByIds(customerIds: string[]): Observable<boolean> {
    return this._customerService.removeCustomersByIds(customerIds);
  }

  public findCustomerById(customerId: string): Observable<CustomerDto> {
    return this._customerService
      .findCustomerById(customerId)
      .pipe(map(CustomerMapper.mapToDto));
  }

  public findCustomers(
    customerCriteria?: CustomerCriteriaInput,
  ): Observable<CustomerDto[]> {
    return this._customerService
      .findCustomers(
        CustomerMapper.mapCriteriaInputToCriteria(customerCriteria),
      )
      .pipe(map(CustomerMapper.mapListToDtoList));
  }
}
