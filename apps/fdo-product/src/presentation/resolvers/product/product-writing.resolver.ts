import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCreateInput } from '../../../facade/dtos/product/inputs/product-create.input';
import { ProductUpdateInput } from '../../../facade/dtos/product/inputs/product-update.input';
import { Observable } from 'rxjs';
import { ProductDto } from '../../../facade/dtos/product/product.dto';
import { ProductsManagementFacade } from '../../../facade/frontoffice/products-management.facade';

@Resolver(() => ProductDto)
export class ProductWritingResolver {
  constructor(
    private readonly productsManagementFacade: ProductsManagementFacade,
  ) {}

  @Mutation(() => ProductDto, { name: `createProduct`, nullable: true })
  create(
    @Args('createProductInput')
    payload: ProductCreateInput,
  ): Observable<ProductDto> {
    return this.productsManagementFacade.createProduct(payload);
  }

  @Mutation(() => ProductDto, { name: `updateProduct` })
  update(
    @Args('updateProductInput')
    payload: ProductUpdateInput,
  ): Observable<ProductDto> {
    return this.productsManagementFacade.updateProduct(payload);
  }
}
