import { User } from '@nestjs-cognito/auth';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { CustomersService } from '~/business';
import {
  CreateCustomerMutation,
  CustomersQuery,
  CustomerOutput,
  UpdateCustomerMutation,
  UserOutput,
} from '../dtos';
import { DeleteCustomerMutation } from '../dtos/customers/mutations/delete-customer.mutation';
import { DeleteCustomersMutation } from '../dtos/customers/mutations/delete-customers.mutation';
import { CustomerMapper } from '../mapping';

@Injectable()
export class CustomersManagementFacade {
  constructor(
    private readonly customersService: CustomersService,
    private readonly customerMapper: CustomerMapper,
  ) {}

  public createCustomer(
    authorId: string,
    input: CreateCustomerMutation,
  ): Observable<CustomerOutput> {
    return this.customersService
      .createCustomer(
        this.customerMapper.toEntity({
          ...input,
          authorId,
        }),
      )
      .pipe(map((dto) => this.customerMapper.toDto(dto)));
  }

  public updateCustomer(
    authorId: string,
    input: UpdateCustomerMutation,
  ): Observable<CustomerOutput> {
    return this.customersService
      .updateCustomer(
        this.customerMapper.toEntity({
          ...input,
          authorId,
        }),
      )
      .pipe(map((dto) => this.customerMapper.toDto(dto)));
  }

  public removeCustomerById(
    authorId: string,
    payload: DeleteCustomerMutation,
  ): Observable<CustomerOutput> {
    return this.customersService
      .removeCustomerById(authorId, payload.id)
      .pipe(map((dto) => this.customerMapper.toDto(dto)));
  }

  public removeCustomersByIds(
    authorId: string,
    payload: DeleteCustomersMutation,
  ): Observable<boolean> {
    return this.customersService.removeCustomersByIds(authorId, payload.ids);
  }

  public findCustomerById(
    authorId: string,
    customerId: string,
  ): Observable<CustomerOutput> {
    return this.customersService
      .findCustomerById(authorId, customerId)
      .pipe(map((dto) => this.customerMapper.toDto(dto)));
  }

  public findCustomers(
    authorId: string,
    customerCriteria?: CustomersQuery,
  ): Observable<CustomerOutput[]> {
    return this.customersService
      .findCustomers(
        this.customerMapper.toCriteria({
          ...customerCriteria,
          authorId,
        }),
      )
      .pipe(map((dto) => this.customerMapper.toDtoArray(dto)));
  }

  private getAuthorId(user: User | UserOutput): string {
    return user instanceof User ? user.username : user.id;
  }
}
