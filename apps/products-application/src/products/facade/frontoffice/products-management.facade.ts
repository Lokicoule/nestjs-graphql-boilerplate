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
    cognitoUser: User,
    input: ProductCreateInput,
  ): Observable<ProductDto> {
    return this.productsService
      .createProduct(
        this.productMapper.toEntity({
          ...input,
          authorId: cognitoUser.username,
        }),
      )
      .pipe(map((dto) => this.productMapper.toDto(dto)));
  }

  public updateProduct(
    cognitoUser: User,
    input: ProductUpdateInput,
  ): Observable<ProductDto> {
    return this.productsService
      .updateProduct(
        this.productMapper.toEntity({
          ...input,
          authorId: cognitoUser.username,
        }),
      )
      .pipe(map((dto) => this.productMapper.toDto(dto)));
  }

  public removeProductById(
    cognitoUser: User,
    productId: string,
  ): Observable<ProductDto> {
    return this.productsService
      .removeProductById(cognitoUser.username, productId)
      .pipe(map((dto) => this.productMapper.toDto(dto)));
  }

  public removeProductsByIds(
    cognitoUser: User,
    productIds: string[],
  ): Observable<boolean> {
    return this.productsService.removeProductsByIds(
      cognitoUser.username,
      productIds,
    );
  }

  public findProductById(
    cognitoUser: User,
    productId: string,
  ): Observable<ProductDto> {
    return this.productsService
      .findProductById(cognitoUser.username, productId)
      .pipe(map((dto) => this.productMapper.toDto(dto)));
  }

  public findProducts(
    user: User | UserDto,
    productCriteria?: ProductCriteriaInput,
  ): Observable<ProductDto[]> {
    return this.productsService
      .findProducts(
        this.productMapper.toCriteria({
          ...productCriteria,
          authorId: this.getAuthorId(user),
        }),
      )
      .pipe(map((dto) => this.productMapper.toDtoArray(dto)));
  }

  private getAuthorId(user: User | UserDto): string {
    return user instanceof User ? user.username : user.id;
  }
}