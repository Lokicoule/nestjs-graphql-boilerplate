import { User } from '@nestjs-cognito/auth';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import {
  CustomerCriteriaInput,
  CustomerDto,
  CustomersManagementFacade,
  UserDto,
} from '~/facade';

@Resolver(() => CustomerDto)
@Authorization({
  requiredGroups: ['User'],
})
export class CustomersReadingResolver {
  constructor(
    private readonly customersManagementFacade: CustomersManagementFacade,
  ) {}

  @Query(() => [CustomerDto], {
    name: `customers`,
    nullable: true,
  })
  findByCriteria(
    @CurrentUser() cognitoUser: User,
    @Args('criterions', { nullable: true })
    criterions?: CustomerCriteriaInput,
  ): Observable<CustomerDto[]> {
    return this.customersManagementFacade.findCustomers(
      cognitoUser.username,
      criterions,
    );
  }

  @Query(() => CustomerDto, {
    name: `customer`,
    nullable: true,
  })
  findById(
    @CurrentUser() cognitoUser: User,
    @Args('id', { type: () => String }) id: string,
  ): Observable<CustomerDto> {
    return this.customersManagementFacade.findCustomerById(
      cognitoUser.username,
      id,
    );
  }

  @ResolveField((of) => UserDto)
  user(@Parent() customer: CustomerDto): any {
    console.log('customer.authorId', customer.authorId);
    return { __typename: 'User', id: customer.authorId };
  }
}
