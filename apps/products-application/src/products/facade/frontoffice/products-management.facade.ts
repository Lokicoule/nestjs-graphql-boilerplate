import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from '@nestjs-cognito/auth';

import { ProductsService } from '../../business/services/products.service';
import { ProductDto } from '../dtos/product.dto';
import { ProductCreateInput } from '../dtos/inputs/product-create.input';
import { ProductUpdateInput } from '../dtos/inputs/product-update.input';
import { ProductMapper } from '../mapping/product.mapper';
import { ProductCriteriaInput } from '../dtos/inputs/product-criteria.input';
import { UserDto } from '../../../users/facade/dtos/user.dto';

@Injectable()
export class ProductsManagementFacade {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productMapper: ProductMapper,
  ) {}

  public createProduct(
    authorId: string,
    input: ProductCreateInput,
  ): Observable<ProductDto> {
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
    input: ProductUpdateInput,
  ): Observable<ProductDto> {
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
    productId: string,
  ): Observable<ProductDto> {
    return this.productsService
      .removeProductById(authorId, productId)
      .pipe(map((dto) => this.productMapper.toDto(dto)));
  }

  public removeProductsByIds(
    authorId: string,
    productIds: string[],
  ): Observable<boolean> {
    return this.productsService.removeProductsByIds(authorId, productIds);
  }

  public findProductById(
    authorId: string,
    productId: string,
  ): Observable<ProductDto> {
    return this.productsService
      .findProductById(authorId, productId)
      .pipe(map((dto) => this.productMapper.toDto(dto)));
  }

  public findProducts(
    authorId: string,
    productCriteria?: ProductCriteriaInput,
  ): Observable<ProductDto[]> {
    return this.productsService
      .findProducts(
        this.productMapper.toCriteria({
          ...productCriteria,
          authorId,
        }),
      )
      .pipe(map((dto) => this.productMapper.toDtoArray(dto)));
  }

  private getAuthorId(user: User | UserDto): string {
    return user instanceof User ? user.username : user.id;
  }
}
