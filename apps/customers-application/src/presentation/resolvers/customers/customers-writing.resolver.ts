import { GqlAuthorization, GqlCognitoUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import {
  CreateCustomerMutation,
  CustomerOutput,
  CustomersManagementFacade,
  UpdateCustomerMutation,
} from '~/facade';

@Resolver(() => CustomerOutput)
@GqlAuthorization({
  requiredGroups: ['User'],
})
export class CustomersWritingResolver {
  constructor(
    private readonly customersManagementFacade: CustomersManagementFacade,
  ) {}

  @Mutation(() => CustomerOutput, { name: `createCustomer`, nullable: true })
  create(
    @GqlCognitoUser('username') username: string,
    @Args('payload')
    payload: CreateCustomerMutation,
  ): Observable<CustomerOutput> {
    return this.customersManagementFacade.createCustomer(username, payload);
  }

  @Mutation(() => CustomerOutput, { name: `updateCustomer` })
  update(
    @GqlCognitoUser('username') username: string,
    @Args('payload')
    payload: UpdateCustomerMutation,
  ): Observable<CustomerOutput> {
    return this.customersManagementFacade.updateCustomer(username, payload);
  }
}
