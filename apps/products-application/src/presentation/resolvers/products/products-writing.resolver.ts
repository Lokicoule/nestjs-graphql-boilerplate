import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { User } from '@nestjs-cognito/auth';
import {
  ProductCreateInput,
  ProductDto,
  ProductsManagementFacade,
  ProductUpdateInput,
} from '~/facade';

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
    @CurrentUser() cognitoUser: User,
    @Args('payload')
    payload: ProductCreateInput,
  ): Observable<ProductDto> {
    return this.productsManagementFacade.createProduct(
      cognitoUser.username,
      payload,
    );
  }

  @Mutation(() => ProductDto, { name: `updateProduct` })
  update(
    @CurrentUser() cognitoUser: User,
    @Args('payload')
    payload: ProductUpdateInput,
  ): Observable<ProductDto> {
    return this.productsManagementFacade.updateProduct(
      cognitoUser.username,
      payload,
    );
  }
}
