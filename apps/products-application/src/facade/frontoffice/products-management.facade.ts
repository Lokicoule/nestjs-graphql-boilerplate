import { User } from '@nestjs-cognito/auth';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { ProductsService } from '~/business';
import {
  CreateProductMutation,
  ProductsQuery,
  ProductOutput,
  UpdateProductMutation,
  UserOutput,
} from '../dtos';
import { ProductMapper } from '../mapping';
import { DeleteProductsMutation } from '../dtos/products/mutations/delete-products.mutation';
import { DeleteProductMutation } from '../dtos/products/mutations/delete-product.mutation';

@Injectable()
export class ProductsManagementFacade {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productMapper: ProductMapper,
  ) {}

  public createProduct(
    authorId: string,
    input: CreateProductMutation,
  ): Observable<ProductOutput> {
    return this.productsService
      .createProduct(
        this.productMapper.toEntity({
          ...input,
          authorId,
        }),
      )
      .pipe(map((dto) => this.productMapper.toDto(dto)));
  }

  public updateProduct(
    authorId: string,
    input: UpdateProductMutation,
  ): Observable<ProductOutput> {
    return this.productsService
      .updateProduct(
        this.productMapper.toEntity({
          ...input,
          authorId,
        }),
      )
      .pipe(map((dto) => this.productMapper.toDto(dto)));
  }

  public removeProductById(
    authorId: string,
    payload: DeleteProductMutation,
  ): Observable<ProductOutput> {
    return this.productsService
      .removeProductById(authorId, payload.id)
      .pipe(map((dto) => this.productMapper.toDto(dto)));
  }

  public removeProductsByIds(
    authorId: string,
    payload: DeleteProductsMutation,
  ): Observable<boolean> {
    return this.productsService.removeProductsByIds(authorId, payload.ids);
  }

  public findProductById(
    authorId: string,
    productId: string,
  ): Observable<ProductOutput> {
    return this.productsService
      .findProductById(authorId, productId)
      .pipe(map((dto) => this.productMapper.toDto(dto)));
  }

  public findProducts(
    authorId: string,
    productCriteria?: ProductsQuery,
  ): Observable<ProductOutput[]> {
    return this.productsService
      .findProducts(
        this.productMapper.toCriteria({
          ...productCriteria,
          authorId,
        }),
      )
      .pipe(map((dto) => this.productMapper.toDtoArray(dto)));
  }

  private getAuthorId(user: User | UserOutput): string {
    return user instanceof User ? user.username : user.id;
  }
}
