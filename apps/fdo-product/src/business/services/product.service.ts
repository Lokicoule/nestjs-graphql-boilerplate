import { TechnicalException, UseCaseException } from '@lib/fdo-domain';
import { Injectable } from '@nestjs/common';
import { Observable, throwIfEmpty } from 'rxjs';
import { ProductCriteria } from '../../domain/criterias/product/product.criteria';
import { Product } from '../../domain/entities/product/product.entity';
import { ProductRepository } from '../../persistence/repositories/product/product.repository';
import { ProductSettingService } from './product-setting.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productSettingService: ProductSettingService,
  ) {}

  public createProduct(product: Product): Observable<Product> {
    console.log(product);
    if (!Boolean(product)) {
      throw new TechnicalException('The product is required');
    }
    if (!Boolean(product.code)) {
      return this.productSettingService.generateProduct(product);
    }

    this.validateProduct(product);
    return this.productRepository
      .create(product)
      .pipe(throwIfEmpty(() => new TechnicalException('Product not created')));
  }

  public updateProduct(product: Product): Observable<Product> {
    if (!Boolean(product)) {
      throw new TechnicalException('The product is null or undefined');
    }
    if (!Boolean(product._id)) {
      throw new UseCaseException('The product id is required');
    }

    this.validateProduct(product);
    return this.productRepository.updateById(product._id, product);
  }

  public removeProductById(id: string): Observable<Product> {
    return this.productRepository.removeById(id);
  }

  public removeProductsByIds(ids: string[]): Observable<boolean> {
    return this.productRepository.removeByIds(ids);
  }

  public findProductById(id: string): Observable<Product> {
    return this.productRepository.findById(id);
  }

  public findProducts(
    productCriteria?: ProductCriteria,
  ): Observable<Product[]> {
    return this.productRepository.find(productCriteria);
  }

  private validateProduct(product: Product): void {
    const listErrors: string[] = [];

    if (!Boolean(product.code)) {
      listErrors.push('The product code is required');
    }
    if (!Boolean(product.label)) {
      listErrors.push('The product label is required');
    }

    if (listErrors.length > 0) {
      throw new UseCaseException(JSON.stringify(listErrors));
    }
  }
}
