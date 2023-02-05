import { GqlAuthorization, GqlCognitoUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import {
  CreateProductMutation,
  ProductOutput,
  ProductsManagementFacade,
  UpdateProductMutation,
} from '~/facade';

@Resolver(() => ProductOutput)
@GqlAuthorization({
  requiredGroups: ['User'],
})
export class ProductsWritingResolver {
  constructor(
    private readonly productsManagementFacade: ProductsManagementFacade,
  ) {}

  @Mutation(() => ProductOutput, { name: `createProduct`, nullable: true })
  create(
    @GqlCognitoUser('username') username: string,
    @Args('payload')
    payload: CreateProductMutation,
  ): Observable<ProductOutput> {
    return this.productsManagementFacade.createProduct(username, payload);
  }

  @Mutation(() => ProductOutput, { name: `updateProduct` })
  update(
    @GqlCognitoUser('username') username: string,
    @Args('payload')
    payload: UpdateProductMutation,
  ): Observable<ProductOutput> {
    return this.productsManagementFacade.updateProduct(username, payload);
  }
}
