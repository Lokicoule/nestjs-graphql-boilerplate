import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';

import { ProductCreateInput } from '../../facade/dtos/inputs/product-create.input';
import { ProductUpdateInput } from '../../facade/dtos/inputs/product-update.input';
import { ProductDto } from '../../facade/dtos/product.dto';
import { ProductsManagementFacade } from '../../facade/frontoffice/products-management.facade';

@Resolver(() => ProductDto)
@Authorization({
  requiredGroups: ['User'],
})
export class ProductsWritingResolver {
  constructor(
    private readonly productsManagementFacade: ProductsManagementFacade,
  ) {}

  @Mutation(() => ProductDto, { name: `createProduct`, nullable: true })
  create(
    @CurrentUser() cognitoUser,
    @Args('payload')
    payload: ProductCreateInput,
  ): Observable<ProductDto> {
    return this.productsManagementFacade.createProduct(cognitoUser, payload);
  }

  @Mutation(() => ProductDto, { name: `updateProduct` })
  update(
    @CurrentUser() cognitoUser,
    @Args('payload')
    payload: ProductUpdateInput,
  ): Observable<ProductDto> {
    return this.productsManagementFacade.updateProduct(cognitoUser, payload);
  }
}