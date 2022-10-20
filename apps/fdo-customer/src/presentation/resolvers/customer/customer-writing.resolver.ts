import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddressInput } from 'apps/fdo-customer/src/facade/dtos/address/address.input';
import { CustomerInput } from 'apps/fdo-customer/src/facade/dtos/customer/customer.input';
import { Observable } from 'rxjs';
import { AddressDto } from '../../../facade/dtos/address/address.dto';
import { CustomerDto } from '../../../facade/dtos/customer/customer.dto';
import { CustomersManagementFacade } from '../../../facade/frontoffice/customers-management.facade';

@Resolver(() => CustomerDto)
export class CustomerWritingResolver {
  constructor(
    private readonly customersManagementFacade: CustomersManagementFacade,
  ) {}

  @Mutation(() => CustomerDto, { name: `createCustomer`, nullable: true })
  create(
    @Args('createCustomerInput')
    payload: CustomerInput,
  ): Observable<CustomerDto> {
    return this.customersManagementFacade.createCustomer(payload);
  }

  @Mutation(() => CustomerDto, { name: `updateCustomer` })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('updateCustomerInput')
    payload: CustomerInput,
  ): Observable<CustomerDto> {
    return this.customersManagementFacade.updateCustomerById(id, payload);
  }

  @Mutation(() => CustomerDto)
  addAddress(
    @Args('id', { type: () => String }) id: string,
    @Args('createCustomerAddressInput')
    payload: AddressInput,
  ): Observable<CustomerDto> {
    return this.customersManagementFacade.addAddress(id, payload);
  }

  @Mutation(() => CustomerDto)
  updateAddress(
    @Args('id', { type: () => String }) id: string,
    @Args('updateCustomerAddressInput')
    payload: AddressInput,
  ): Observable<CustomerDto> {
    return this.customersManagementFacade.updateAddress(id, payload);
  }
}
