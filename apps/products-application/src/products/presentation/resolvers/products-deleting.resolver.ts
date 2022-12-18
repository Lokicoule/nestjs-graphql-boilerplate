import { User } from '@nestjs-cognito/auth';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { ProductDto } from '../../facade/dtos/product.dto';
import { ProductsManagementFacade } from '../../facade/frontoffice/products-management.facade';

@Authorization({
  requiredGroups: ['User'],
})
@Resolver(() => ProductDto)
export class ProductsDeletingResolver {
  constructor(
    private readonly productsManagementFacade: ProductsManagementFacade,
  ) {}

  @Mutation(() => ProductDto, {
    name: `removeProduct`,
  })
  deleteById(
    @CurrentUser() cognitoUser: User,
    @Args('id', { type: () => String }) id: string,
  ): Observable<ProductDto> {
    return this.productsManagementFacade.removeProductById(cognitoUser, id);
  }

  @Mutation(() => Boolean, {
    name: `removeProducts`,
  })
  deleteByIds(
    @CurrentUser() cognitoUser: User,
    @Args('ids', { type: () => [String] }) ids: string[],
  ): Observable<boolean> {
    return this.productsManagementFacade.removeProductsByIds(cognitoUser, ids);
  }
}
