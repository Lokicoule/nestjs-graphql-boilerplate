import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CustomerDto } from '../../../facade/dtos/inputs/customer.dto';
import { CreateCustomerAddressInput } from '../../../facade/dtos/inputs/inputs/create-customer-address.input';
import { CreateCustomerInput } from '../../../facade/dtos/inputs/inputs/create-customer.input';
import { UpdateCustomerAddressInput } from '../../../facade/dtos/inputs/inputs/update-customer-address.input';
import { UpdateCustomerInput } from '../../../facade/dtos/inputs/inputs/update-customer.input';

import { Observable } from 'rxjs';
import { CustomersManagementFacade } from '../../../facade/frontoffice/customers-management.facade';

@Resolver(() => CustomerDto)
export class CustomerWritingResolver {
  constructor(
    private readonly _customersManagementFacade: CustomersManagementFacade,
  ) {}

  @Mutation(() => CustomerDto, { name: `createCustomer`, nullable: true })
  create(
    @Args('createCustomerInput')
    payload: CreateCustomerInput,
  ): Observable<CustomerDto> {
    return this._customersManagementFacade.createCustomer(payload);
  }

  @Mutation(() => CustomerDto)
  update(
    @Args('updateCustomerInput')
    payload: UpdateCustomerInput,
  ): Observable<CustomerDto> {
    throw new Error('Method not implemented.');
  }

  @Mutation(() => CustomerDto)
  addAddress(
    @Args('createCustomerAddressInput')
    payload: CreateCustomerAddressInput,
  ): Observable<CustomerDto> {
    throw new Error('Method not implemented.');
  }

  @Mutation(() => CustomerDto)
  updateAddress(
    @Args('updateCustomerAddressInput')
    payload: UpdateCustomerAddressInput,
  ): Observable<CustomerDto> {
    throw new Error('Method not implemented.');
  }
}
