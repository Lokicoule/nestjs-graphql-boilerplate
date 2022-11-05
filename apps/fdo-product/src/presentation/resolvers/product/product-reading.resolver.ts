import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductCriteriaInput } from '../../../facade/dtos/product/inputs/product-criteria.input';
import { ProductsManagementFacade } from '../../../facade/frontoffice/products-management.facade';
import { Observable } from 'rxjs';
import { ProductDto } from '../../../facade/dtos/product/product.dto';

@Resolver(() => ProductDto)
export class ProductReadingResolver {
  constructor(
    private readonly productsManagementFacade: ProductsManagementFacade,
  ) {}

  @Query(() => [ProductDto], {
    name: `getProducts`,
    nullable: true,
  })
  findByCriteria(
    @Args('criterions', { nullable: true })
    criterions?: ProductCriteriaInput,
  ): Observable<ProductDto[]> {
    return this.productsManagementFacade.findProducts(criterions);
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
