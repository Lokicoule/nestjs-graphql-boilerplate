import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { User } from '@nestjs-cognito/auth';
import {
  CreateProductMutation,
  ProductOutput,
  ProductsManagementFacade,
  UpdateProductMutation,
} from '~/facade';

@Resolver(() => ProductOutput)
@Authorization({
  requiredGroups: ['User'],
})
export class ProductsWritingResolver {
  constructor(
    private readonly productsManagementFacade: ProductsManagementFacade,
  ) {}

  @Mutation(() => ProductOutput, { name: `createProduct`, nullable: true })
  create(
    @CurrentUser() cognitoUser: User,
    @Args('payload')
    payload: CreateProductMutation,
  ): Observable<ProductOutput> {
    return this.productsManagementFacade.createProduct(
      cognitoUser.username,
      payload,
    );
  }

  @Mutation(() => ProductOutput, { name: `updateProduct` })
  update(
    @CurrentUser() cognitoUser: User,
    @Args('payload')
    payload: UpdateProductMutation,
  ): Observable<ProductOutput> {
    return this.productsManagementFacade.updateProduct(
      cognitoUser.username,
      payload,
    );
  }
}
