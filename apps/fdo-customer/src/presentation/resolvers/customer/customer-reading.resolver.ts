import { Args, Query, Resolver } from '@nestjs/graphql';
import { CustomerCriteriaInput } from 'apps/fdo-customer/src/facade/dtos/customer/inputs/customer-criteria.input';
import { CustomersManagementFacade } from 'apps/fdo-customer/src/facade/frontoffice/customers-management.facade';
import { Observable } from 'rxjs';
import { CustomerDto } from '../../../facade/dtos/customer/customer.dto';

@Resolver(() => CustomerDto)
export class CustomerReadingResolver {
  constructor(
    private readonly customersManagementFacade: CustomersManagementFacade,
  ) {}

  @Query(() => [CustomerDto], {
    name: `getCustomers`,
    nullable: true,
  })
  findByCriteria(
    @Args('criterions', { nullable: true })
    criterions?: CustomerCriteriaInput,
  ): Observable<CustomerDto[]> {
    return this.customersManagementFacade.findCustomers(criterions);
  }

  @Query(() => CustomerDto, {
    name: `getCustomer`,
    nullable: true,
  })
  findById(
    @Args('id', { type: () => String }) id: string,
  ): Observable<CustomerDto> {
    return this.customersManagementFacade.findCustomerById(id);
  }
}
