import { User } from '@nestjs-cognito/auth';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { CustomerOutput, CustomersManagementFacade } from '~/facade';

@Authorization({
  requiredGroups: ['User'],
})
@Resolver(() => CustomerOutput)
export class CustomersDeletingResolver {
  constructor(
    private readonly customersManagementFacade: CustomersManagementFacade,
  ) {}

  @Mutation(() => CustomerOutput, {
    name: `removeCustomer`,
  })
  deleteById(
    @CurrentUser() cognitoUser: User,
    @Args('id', { type: () => String }) id: string,
  ): Observable<CustomerOutput> {
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
