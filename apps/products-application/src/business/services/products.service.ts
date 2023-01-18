import { Injectable } from '@nestjs/common';
import {
  defer,
  Observable,
  of,
  retry,
  switchMap,
  tap,
  throwIfEmpty,
} from 'rxjs';

import { TechnicalException, UseCaseException } from '@lib/fdo-domain';

import { ProductCriteria } from '~/domain/criterias/product.criteria';
import { Product } from '~/domain/entities/product.entity';
import { ProductsRepository } from '~/persistence/repositories/products.repository';
import { SettingCriteria } from '~/domain/criterias/setting.criteria';
import { SettingEnum } from '~/domain/enums/setting.enum';
import { duplicateRetryStrategy } from '@lib/fdo-database/mongodb/retry/duplicate-retry.strategy';
import { ProductSettingsService } from './product-settings.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly productSettingsService: ProductSettingsService,
  ) {}

  public createProduct(product: Product): Observable<Product> {
    if (!Boolean(product)) {
      throw new TechnicalException('PRODUCT_IS_NULL');
    }
    if (!Boolean(product.code)) {
      return this.generateProduct(product);
    }

    return this.productsRepository
      .findIfExists({
        code: product.code,
        authorId: product.authorId,
      })
      .pipe(
        tap((exists) => {
          if (exists) {
            throw new UseCaseException('PRODUCT_CODE_ALREADY_EXISTS');
          }
          this.validateProduct(product);
        }),
        switchMap(() => this.productsRepository.create(product)),
        throwIfEmpty(() => new TechnicalException('PRODUCT_NOT_CREATED')),
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
    return this.productsRepository
      .find({
        code: product.code,
        authorId: product.authorId,
      })
      .pipe(
        tap((products) => {
          if (
            products.some(
              (productFound) => productFound._id?.toString() !== product._id,
            )
          ) {
            throw new UseCaseException('PRODUCT_CODE_ALREADY_EXISTS');
          }
          this.validateProduct(product);
        }),
        switchMap(() =>
          this.productsRepository.updateById(product._id, product),
        ),
      );
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

  private generateProduct(product: Product): Observable<Product> {
    return defer(() =>
      this.productSettingsService.generateCode(
        new SettingCriteria({
          authorId: product.authorId,
          code: SettingEnum.getEnum().CODE_GENERATOR,
        }),
      ),
    ).pipe(
      switchMap((code: string) =>
        of(
          new Product({
            ...product,
            code,
          }),
        ),
      ),
      switchMap((product) => this.productsRepository.create(product)),
      retry({ count: 10, delay: duplicateRetryStrategy }),
    );
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
