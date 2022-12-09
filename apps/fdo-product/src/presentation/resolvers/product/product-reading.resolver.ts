import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductCriteriaInput } from '../../../facade/dtos/product/inputs/product-criteria.input';
import { ProductsManagementFacade } from '../../../facade/frontoffice/products-management.facade';
import { Observable } from 'rxjs';
import { ProductDto } from '../../../facade/dtos/product/product.dto';
import { Authorization } from '@nestjs-cognito/graphql';
import { CurrentUser } from '@nestjs-cognito/auth';

@Resolver(() => ProductDto)
@Authorization({
  requiredGroups: ['User'],
})
export class ProductReadingResolver {
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
    @Args('id', { type: () => String }) id: string,
  ): Observable<ProductDto> {
    return this.productsManagementFacade.findProductById(id);
  }
}
