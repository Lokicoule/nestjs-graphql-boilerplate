import { User } from '@nestjs-cognito/auth';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import {
  ProductCriteriaInput,
  ProductDto,
  ProductsManagementFacade,
  UserDto,
} from '~/facade';

@Resolver(() => ProductDto)
@Authorization({
  requiredGroups: ['User'],
})
export class ProductsReadingResolver {
  constructor(
    private readonly productsManagementFacade: ProductsManagementFacade,
  ) {}

  @Query(() => [ProductDto], {
    name: `products`,
    nullable: true,
  })
  findByCriteria(
    @CurrentUser() cognitoUser: User,
    @Args('criterions', { nullable: true })
    criterions?: ProductCriteriaInput,
  ): Observable<ProductDto[]> {
    return this.productsManagementFacade.findProducts(
      cognitoUser.username,
      criterions,
    );
  }

  @Query(() => ProductDto, {
    name: `product`,
    nullable: true,
  })
  findById(
    @CurrentUser() cognitoUser: User,
    @Args('id', { type: () => String }) id: string,
  ): Observable<ProductDto> {
    return this.productsManagementFacade.findProductById(
      cognitoUser.username,
      id,
    );
  }

  @ResolveField((of) => UserDto)
  user(@Parent() product: ProductDto): any {
    console.log('product.authorId', product.authorId);
    return { __typename: 'User', id: product.authorId };
  }
}
