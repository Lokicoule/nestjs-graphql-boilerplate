import { GqlAuthorization, GqlCognitoUser } from '@nestjs-cognito/graphql';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import {
  ProductOutput,
  ProductsManagementFacade,
  ProductsQuery,
  UserOutput,
} from '~/facade';

@Resolver(() => ProductOutput)
@GqlAuthorization({
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
    @GqlCognitoUser('username') username: string,
    @Args('criteria', { nullable: true })
    criteria?: ProductsQuery,
  ): Observable<ProductOutput[]> {
    return this.productsManagementFacade.findProducts(username, criteria);
  }

  @Query(() => ProductOutput, {
    name: `product`,
    nullable: true,
  })
  findById(
    @GqlCognitoUser('username') username: string,
    @Args('id', { type: () => String }) id: string,
  ): Observable<ProductOutput> {
    return this.productsManagementFacade.findProductById(username, id);
  }

  @ResolveField((of) => UserOutput)
  user(@Parent() product: ProductOutput): any {
    console.log('product.authorId', product.authorId);
    return { __typename: 'User', id: product.authorId };
  }
}
