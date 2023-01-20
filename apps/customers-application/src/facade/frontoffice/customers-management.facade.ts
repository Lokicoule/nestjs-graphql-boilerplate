import { User } from '@nestjs-cognito/auth';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { CustomersService } from '~/business';
import {
  CustomerCreateInput,
  CustomerCriteriaInput,
  CustomerDto,
  CustomerUpdateInput,
  UserDto,
} from '../dtos';
import { CustomerMapper } from '../mapping';

@Injectable()
export class CustomersManagementFacade {
  constructor(
    private readonly customersService: CustomersService,
    private readonly customerMapper: CustomerMapper,
  ) {}

  public createCustomer(
    authorId: string,
    input: CustomerCreateInput,
  ): Observable<CustomerDto> {
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
    input: CustomerUpdateInput,
  ): Observable<CustomerDto> {
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
    customerId: string,
  ): Observable<CustomerDto> {
    return this.customersService
      .removeCustomerById(authorId, customerId)
      .pipe(map((dto) => this.customerMapper.toDto(dto)));
  }

  public removeCustomersByIds(
    authorId: string,
    customerIds: string[],
  ): Observable<boolean> {
    return this.customersService.removeCustomersByIds(authorId, customerIds);
  }

  public findCustomerById(
    authorId: string,
    customerId: string,
  ): Observable<CustomerDto> {
    return this.customersService
      .findCustomerById(authorId, customerId)
      .pipe(map((dto) => this.customerMapper.toDto(dto)));
  }

  public findCustomers(
    authorId: string,
    customerCriteria?: CustomerCriteriaInput,
  ): Observable<CustomerDto[]> {
    return this.customersService
      .findCustomers(
        this.customerMapper.toCriteria({
          ...customerCriteria,
          authorId,
        }),
      )
      .pipe(map((dto) => this.customerMapper.toDtoArray(dto)));
  }

  private getAuthorId(user: User | UserDto): string {
    return user instanceof User ? user.username : user.id;
  }
}
