import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ProductService } from '../../business/services/product.service';
import { ProductDto } from '../dtos/product/product.dto';
import { ProductCreateInput } from '../dtos/product/inputs/product-create.input';
import { ProductCriteriaInput } from '../dtos/product/inputs/product-criteria.input';
import { ProductUpdateInput } from '../dtos/product/inputs/product-update.input';
import { ProductMapper } from '../mapping/product/product.mapper';

@Injectable()
export class ProductsManagementFacade {
  constructor(private readonly productService: ProductService) {}

  public createProduct(input: ProductCreateInput): Observable<ProductDto> {
    return this.productService
      .createProduct(ProductMapper.mapToEntity(input))
      .pipe(map(ProductMapper.mapToDto));
  }

  public updateProduct(input: ProductUpdateInput): Observable<ProductDto> {
    return this.productService
      .updateProduct(ProductMapper.mapToEntity(input))
      .pipe(map(ProductMapper.mapToDto));
  }

  public removeProductById(productId: string): Observable<ProductDto> {
    return this.productService
      .removeProductById(productId)
      .pipe(map(ProductMapper.mapToDto));
  }

  public removeProductsByIds(productIds: string[]): Observable<boolean> {
    return this.productService.removeProductsByIds(productIds);
  }

  public findProductById(productId: string): Observable<ProductDto> {
    return this.productService
      .findProductById(productId)
      .pipe(map(ProductMapper.mapToDto));
  }

  public findProducts(
    productCriteria?: ProductCriteriaInput,
  ): Observable<ProductDto[]> {
    return this.productService
      .findProducts(ProductMapper.mapCriteriaInputToCriteria(productCriteria))
      .pipe(map(ProductMapper.mapListToDtoList));
  }
}
