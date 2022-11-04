import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CustomersManagementFacade } from '../../../facade/frontoffice/customers-management.facade';
import { Observable } from 'rxjs';
import { CustomerDto } from '../../../facade/dtos/customer/customer.dto';

@Resolver(() => CustomerDto)
export class CustomerDeletingResolver {
  constructor(
    private readonly customersManagementFacade: CustomersManagementFacade,
  ) {}

  @Mutation(() => CustomerDto, {
    name: `removeCustomer`,
  })
  deleteById(
    @Args('id', { type: () => String }) id: string,
  ): Observable<CustomerDto> {
    return this.customersManagementFacade.removeCustomerById(id);
  }

  @Mutation(() => Boolean, {
    name: `removeCustomers`,
  })
  deleteByIds(
    @Args('ids', { type: () => [String] }) ids: string[],
  ): Observable<boolean> {
    return this.customersManagementFacade.removeCustomersByIds(ids);
  }
}
