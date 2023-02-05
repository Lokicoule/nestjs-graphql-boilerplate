import { GqlAuthorization, GqlCognitoUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { CustomerOutput, CustomersManagementFacade } from '~/facade';
import { DeleteCustomerMutation } from '~/facade/dtos/customers/mutations/delete-customer.mutation';
import { DeleteCustomersMutation } from '~/facade/dtos/customers/mutations/delete-customers.mutation';

@GqlAuthorization({
  requiredGroups: ['User'],
})
@Resolver(() => CustomerOutput)
export class CustomersDeletingResolver {
  constructor(
    private readonly customersManagementFacade: CustomersManagementFacade,
  ) {}

  @Mutation(() => CustomerOutput, {
    name: `deleteCustomer`,
  })
  deleteById(
    @GqlCognitoUser('username') username: string,
    @Args('payload', { type: () => DeleteCustomerMutation })
    payload: DeleteCustomerMutation,
  ): Observable<CustomerOutput> {
    return this.customersManagementFacade.removeCustomerById(username, payload);
  }

  @Mutation(() => Boolean, {
    name: `deleteCustomers`,
  })
  deleteByIds(
    @GqlCognitoUser('username') username: string,
    @Args('payload', { type: () => DeleteCustomersMutation })
    payload: DeleteCustomersMutation,
  ): Observable<boolean> {
    return this.customersManagementFacade.removeCustomersByIds(
      username,
      payload,
    );
  }
}
