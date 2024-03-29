import { ArrayMapperWithCriteria } from '@lib/fdo-utils';
import { Injectable } from '@nestjs/common';
import { Product, ProductCriteria } from '~/domain';
import { ProductsQuery, ProductOutput, ProductInput } from '../dtos';

@Injectable()
export class ProductMapper extends ArrayMapperWithCriteria<
  ProductOutput,
  Partial<ProductInput> & Pick<Product, 'authorId'>,
  Product,
  ProductsQuery & Pick<ProductCriteria, 'authorId'>,
  ProductCriteria
> {
  public toCriteria(
    dto: ProductsQuery & Pick<ProductCriteria, 'authorId'>,
  ): ProductCriteria {
    return new ProductCriteria({
      id: dto?.id,
      code: dto?.code,
      label: dto?.label,
      authorId: dto?.authorId,
    });
  }

  public toDto(entity: Product): ProductOutput {
    return new ProductOutput({
      id: entity?._id.toString(),
      authorId: entity?.authorId,
      code: entity.code,
      label: entity.label,
      createdAt: entity?.createdAt,
      updatedAt: entity?.updatedAt,
    });
  }

  public toEntity(
    dto: Partial<ProductInput> & Pick<Product, 'authorId'>,
  ): Product {
    return new Product({
      _id: dto?.id,
      authorId: dto.authorId,
      code: dto?.code,
      label: dto.label,
    });
  }
}
