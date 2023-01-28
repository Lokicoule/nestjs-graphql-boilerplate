import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { User } from '@nestjs-cognito/auth';
import {
  CreateCustomerMutation,
  CustomerOutput,
  CustomersManagementFacade,
  UpdateCustomerMutation,
} from '~/facade';

@Resolver(() => CustomerOutput)
@Authorization({
  requiredGroups: ['User'],
})
export class CustomersWritingResolver {
  constructor(
    private readonly customersManagementFacade: CustomersManagementFacade,
  ) {}

  @Mutation(() => CustomerOutput, { name: `createCustomer`, nullable: true })
  create(
    @CurrentUser() cognitoUser: User,
    @Args('payload')
    payload: CreateCustomerMutation,
  ): Observable<CustomerOutput> {
    return this.customersManagementFacade.createCustomer(
      cognitoUser.username,
      payload,
    );
  }

  @Mutation(() => CustomerOutput, { name: `updateCustomer` })
  update(
    @CurrentUser() cognitoUser: User,
    @Args('payload')
    payload: UpdateCustomerMutation,
  ): Observable<CustomerOutput> {
    return this.customersManagementFacade.updateCustomer(
      cognitoUser.username,
      payload,
    );
  }
}
