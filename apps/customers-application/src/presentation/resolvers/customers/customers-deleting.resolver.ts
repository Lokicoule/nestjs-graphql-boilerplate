import { User } from '@nestjs-cognito/auth';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { CustomerOutput, CustomersManagementFacade } from '~/facade';
import { DeleteCustomerMutation } from '~/facade/dtos/customers/mutations/delete-customer.mutation';
import { DeleteCustomersMutation } from '~/facade/dtos/customers/mutations/delete-customers.mutation';

@Authorization({
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
    @CurrentUser() cognitoUser: User,
    @Args('payload', { type: () => DeleteCustomerMutation })
    payload: DeleteCustomerMutation,
  ): Observable<CustomerOutput> {
    return this.customersManagementFacade.removeCustomerById(
      cognitoUser.username,
      payload,
    );
  }

  @Mutation(() => Boolean, {
    name: `deleteCustomers`,
  })
  deleteByIds(
    @CurrentUser() cognitoUser: User,
    @Args('payload', { type: () => DeleteCustomersMutation })
    payload: DeleteCustomersMutation,
  ): Observable<boolean> {
    return this.customersManagementFacade.removeCustomersByIds(
      cognitoUser.username,
      payload,
    );
  }
}
