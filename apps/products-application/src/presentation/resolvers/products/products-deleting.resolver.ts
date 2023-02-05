import { GqlAuthorization, GqlCognitoUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { ProductOutput, ProductsManagementFacade } from '~/facade';
import { DeleteProductMutation } from '../../../facade/dtos/products/mutations/delete-product.mutation';
import { DeleteProductsMutation } from '../../../facade/dtos/products/mutations/delete-products.mutation';

@GqlAuthorization({
  requiredGroups: ['User'],
})
@Resolver(() => ProductOutput)
export class ProductsDeletingResolver {
  constructor(
    private readonly productsManagementFacade: ProductsManagementFacade,
  ) {}

  @Mutation(() => ProductOutput, {
    name: `deleteProduct`,
  })
  deleteById(
    @GqlCognitoUser('username') username: string,
    @Args('payload', { type: () => DeleteProductMutation })
    payload: DeleteProductMutation,
  ): Observable<ProductOutput> {
    return this.productsManagementFacade.removeProductById(username, payload);
  }

  @Mutation(() => Boolean, {
    name: `deleteProducts`,
  })
  deleteByIds(
    @GqlCognitoUser('username') username: string,
    @Args('payload', { type: () => DeleteProductsMutation })
    payload: DeleteProductsMutation,
  ): Observable<boolean> {
    return this.productsManagementFacade.removeProductsByIds(username, payload);
  }
}
