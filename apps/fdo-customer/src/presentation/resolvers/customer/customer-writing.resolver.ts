import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CustomerCreateInput } from '../../../facade/dtos/customer/inputs/customer-create.input';
import { CustomerUpdateInput } from '../../../facade/dtos/customer/inputs/customer-update.input';
import { Observable } from 'rxjs';
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
    payload: CustomerCreateInput,
  ): Observable<CustomerDto> {
    return this.customersManagementFacade.createCustomer(payload);
  }

  @Mutation(() => CustomerDto, { name: `updateCustomer` })
  update(
    @Args('updateCustomerInput')
    payload: CustomerUpdateInput,
  ): Observable<CustomerDto> {
    return this.customersManagementFacade.updateCustomer(payload);
  }
}
