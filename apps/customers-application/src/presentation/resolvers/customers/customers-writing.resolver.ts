import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { User } from '@nestjs-cognito/auth';
import {
  CustomerCreateInput,
  CustomerDto,
  CustomersManagementFacade,
  CustomerUpdateInput,
} from '~/facade';

@Resolver(() => CustomerDto)
@Authorization({
  requiredGroups: ['User'],
})
export class CustomersWritingResolver {
  constructor(
    private readonly customersManagementFacade: CustomersManagementFacade,
  ) {}

  @Mutation(() => CustomerDto, { name: `createCustomer`, nullable: true })
  create(
    @CurrentUser() cognitoUser: User,
    @Args('payload')
    payload: CustomerCreateInput,
  ): Observable<CustomerDto> {
    return this.customersManagementFacade.createCustomer(
      cognitoUser.username,
      payload,
    );
  }

  @Mutation(() => CustomerDto, { name: `updateCustomer` })
  update(
    @CurrentUser() cognitoUser: User,
    @Args('payload')
    payload: CustomerUpdateInput,
  ): Observable<CustomerDto> {
    return this.customersManagementFacade.updateCustomer(
      cognitoUser.username,
      payload,
    );
  }
}
