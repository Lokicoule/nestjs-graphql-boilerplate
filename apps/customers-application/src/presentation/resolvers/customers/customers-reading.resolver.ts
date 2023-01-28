import { User } from '@nestjs-cognito/auth';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import {
  CustomersQuery,
  CustomerOutput,
  CustomersManagementFacade,
  UserOutput,
} from '~/facade';

@Resolver(() => CustomerOutput)
@Authorization({
  requiredGroups: ['User'],
})
export class CustomersReadingResolver {
  constructor(
    private readonly customersManagementFacade: CustomersManagementFacade,
  ) {}

  @Query(() => [CustomerOutput], {
    name: `customers`,
    nullable: true,
  })
  findByCriteria(
    @CurrentUser() cognitoUser: User,
    @Args('criteria', { nullable: true })
    criteria?: CustomersQuery,
  ): Observable<CustomerOutput[]> {
    return this.customersManagementFacade.findCustomers(
      cognitoUser.username,
      criteria,
    );
  }

  @Query(() => CustomerOutput, {
    name: `customer`,
    nullable: true,
  })
  findById(
    @CurrentUser() cognitoUser: User,
    @Args('id', { type: () => String }) id: string,
  ): Observable<CustomerOutput> {
    return this.customersManagementFacade.findCustomerById(
      cognitoUser.username,
      id,
    );
  }

  @ResolveField((of) => UserOutput)
  user(@Parent() customer: CustomerOutput): any {
    console.log('customer.authorId', customer.authorId);
    return { __typename: 'User', id: customer.authorId };
  }
}
