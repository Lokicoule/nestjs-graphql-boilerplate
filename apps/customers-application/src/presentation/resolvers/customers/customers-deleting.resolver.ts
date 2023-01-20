import { User } from '@nestjs-cognito/auth';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { CustomerDto, CustomersManagementFacade } from '~/facade';

@Authorization({
  requiredGroups: ['User'],
})
@Resolver(() => CustomerDto)
export class CustomersDeletingResolver {
  constructor(
    private readonly customersManagementFacade: CustomersManagementFacade,
  ) {}

  @Mutation(() => CustomerDto, {
    name: `removeCustomer`,
  })
  deleteById(
    @CurrentUser() cognitoUser: User,
    @Args('id', { type: () => String }) id: string,
  ): Observable<CustomerDto> {
    return this.customersManagementFacade.removeCustomerById(
      cognitoUser.username,
      id,
    );
  }

  @Mutation(() => Boolean, {
    name: `removeCustomers`,
  })
  deleteByIds(
    @CurrentUser() cognitoUser: User,
    @Args('ids', { type: () => [String] }) ids: string[],
  ): Observable<boolean> {
    return this.customersManagementFacade.removeCustomersByIds(
      cognitoUser.username,
      ids,
    );
  }
}
