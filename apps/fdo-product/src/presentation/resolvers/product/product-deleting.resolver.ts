import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductsManagementFacade } from '../../../facade/frontoffice/products-management.facade';
import { Observable } from 'rxjs';
import { ProductDto } from '../../../facade/dtos/product/product.dto';

@Resolver(() => ProductDto)
export class ProductDeletingResolver {
  constructor(
    private readonly productsManagementFacade: ProductsManagementFacade,
  ) {}

  @Mutation(() => ProductDto, {
    name: `removeProduct`,
  })
  deleteById(
    @Args('id', { type: () => String }) id: string,
  ): Observable<ProductDto> {
    return this.productsManagementFacade.removeProductById(id);
  }

  @Mutation(() => Boolean, {
    name: `removeProducts`,
  })
  deleteByIds(
    @Args('ids', { type: () => [String] }) ids: string[],
  ): Observable<boolean> {
    return this.productsManagementFacade.removeProductsByIds(ids);
  }
}
