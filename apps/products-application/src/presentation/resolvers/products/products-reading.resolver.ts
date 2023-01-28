import { User } from '@nestjs-cognito/auth';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import {
  ProductsQuery,
  ProductOutput,
  ProductsManagementFacade,
  UserOutput,
} from '~/facade';

@Resolver(() => ProductOutput)
@Authorization({
  requiredGroups: ['User'],
})
export class ProductsReadingResolver {
  constructor(
    private readonly productsManagementFacade: ProductsManagementFacade,
  ) {}

  @Query(() => [ProductOutput], {
    name: `products`,
    nullable: true,
  })
  findByCriteria(
    @CurrentUser() cognitoUser: User,
    @Args('criteria', { nullable: true })
    criteria?: ProductsQuery,
  ): Observable<ProductOutput[]> {
    return this.productsManagementFacade.findProducts(
      cognitoUser.username,
      criteria,
    );
  }

  @Query(() => ProductOutput, {
    name: `product`,
    nullable: true,
  })
  findById(
    @CurrentUser() cognitoUser: User,
    @Args('id', { type: () => String }) id: string,
  ): Observable<ProductOutput> {
    return this.productsManagementFacade.findProductById(
      cognitoUser.username,
      id,
    );
  }

  @ResolveField((of) => UserOutput)
  user(@Parent() product: ProductOutput): any {
    console.log('product.authorId', product.authorId);
    return { __typename: 'User', id: product.authorId };
  }
}
