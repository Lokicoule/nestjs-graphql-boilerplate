import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';

import { ProductCriteriaInput } from '../../facade/dtos/inputs/product-criteria.input';
import { ProductDto } from '../../facade/dtos/product.dto';
import { ProductsManagementFacade } from '../../facade/frontoffice/products-management.facade';
import { UserDto } from '../../../users/facade/dtos/user.dto';

@Resolver(() => ProductDto)
@Authorization({
  requiredGroups: ['User'],
})
export class ProductsReadingResolver {
  constructor(
    private readonly productsManagementFacade: ProductsManagementFacade,
  ) {}

  @Query(() => [ProductDto], {
    name: `getProducts`,
    nullable: true,
  })
  findByCriteria(
    @CurrentUser() cognitoUser,
    @Args('criterions', { nullable: true })
    criterions?: ProductCriteriaInput,
  ): Observable<ProductDto[]> {
    return this.productsManagementFacade.findProducts(cognitoUser, criterions);
  }

  @Query(() => ProductDto, {
    name: `getProduct`,
    nullable: true,
  })
  findById(
    @CurrentUser() cognitoUser,
    @Args('id', { type: () => String }) id: string,
  ): Observable<ProductDto> {
    return this.productsManagementFacade.findProductById(cognitoUser, id);
  }

  @ResolveField((of) => UserDto)
  user(@Parent() product: ProductDto): any {
    return { __typename: 'User', id: product.authorId };
  }
}
