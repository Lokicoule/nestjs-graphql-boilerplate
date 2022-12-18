import { Injectable } from '@nestjs/common';
import { Observable, throwIfEmpty } from 'rxjs';

import { TechnicalException, UseCaseException } from '@lib/fdo-domain';

import { ProductCriteria } from '../../domain/criterias/product.criteria';
import { Product } from '../../domain/entities/product.entity';
import { ProductsRepository } from '../../persistence/repositories/products.repository';
import { ProductsSettingsService } from './products-settings.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly productsSettingsService: ProductsSettingsService,
  ) {}

  public createProduct(product: Product): Observable<Product> {
    if (!Boolean(product)) {
      throw new TechnicalException('PRODUCT_IS_NULL');
    }
    if (!Boolean(product.code)) {
      return this.productsSettingsService.generateProduct(product);
    }

    this.validateProduct(product);
    return this.productsRepository
      .create(product)
      .pipe(
        throwIfEmpty(() => new TechnicalException('CREATED_PRODUCT_IS_NULL')),
      );
  }

  public updateProduct(product: Product): Observable<Product> {
    if (!Boolean(product)) {
      throw new TechnicalException('PRODUCT_IS_NULL');
    }
    if (!Boolean(product._id)) {
      throw new UseCaseException('PRODUCT_ID_IS_NULL');
    }

    this.validateProduct(product);
    return this.productsRepository.updateById(product._id, product);
  }

  public removeProductById(authorId: string, id: string): Observable<Product> {
    return this.productsRepository.removeByConditions({
      authorId,
      _id: id,
    });
  }

  public removeProductsByIds(
    authorId: string,
    ids: string[],
  ): Observable<boolean> {
    return this.productsRepository.removeMany({
      authorId,
      _id: { $in: ids },
    });
  }

  public findProductById(authorId: string, id: string): Observable<Product> {
    return this.productsRepository.findOne({
      _id: id,
      authorId,
    });
  }

  public findProducts(
    productCriteria?: ProductCriteria,
  ): Observable<Product[]> {
    return this.productsRepository.find(productCriteria);
  }

  private validateProduct(product: Product): void {
    const listErrors: string[] = [];

    if (!Boolean(product.authorId)) {
      listErrors.push('AUTHOR_ID_IS_NULL');
    }

    if (!Boolean(product.code)) {
      listErrors.push('PRODUCT_CODE_IS_NULL');
    }

    if (!Boolean(product.label)) {
      listErrors.push('PRODUCT_LABEL_IS_NULL');
    }

    if (listErrors.length > 0) {
      throw new UseCaseException(JSON.stringify(listErrors));
    }
  }
}
