import { GqlAuthorization, GqlCognitoUser } from '@nestjs-cognito/graphql';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import {
  CustomerOutput,
  CustomersManagementFacade,
  CustomersQuery,
  UserOutput,
} from '~/facade';

@Resolver(() => CustomerOutput)
@GqlAuthorization({
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
    @GqlCognitoUser('username') username: string,
    @Args('criteria', { nullable: true })
    criteria?: CustomersQuery,
  ): Observable<CustomerOutput[]> {
    return this.customersManagementFacade.findCustomers(username, criteria);
  }

  @Query(() => CustomerOutput, {
    name: `customer`,
    nullable: true,
  })
  findById(
    @GqlCognitoUser('username') username: string,
    @Args('id', { type: () => String }) id: string,
  ): Observable<CustomerOutput> {
    return this.customersManagementFacade.findCustomerById(username, id);
  }

  @ResolveField((of) => UserOutput)
  user(@Parent() customer: CustomerOutput): any {
    console.log('customer.authorId', customer.authorId);
    return { __typename: 'User', id: customer.authorId };
  }
}
