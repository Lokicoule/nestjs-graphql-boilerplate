import { ArrayMapperWithCriteria } from '@lib/fdo-utils';
import { Injectable } from '@nestjs/common';
import { ProductCriteria } from '../../domain/criterias/product.criteria';
import { Product } from '../../domain/entities/product.entity';
import { ProductCriteriaInput } from '../dtos/inputs/product-criteria.input';
import { ProductInput } from '../dtos/inputs/product.input';
import { ProductDto } from '../dtos/product.dto';

@Injectable()
export class ProductMapper extends ArrayMapperWithCriteria<
  ProductDto,
  Partial<ProductInput> & Pick<Product, 'authorId'>,
  Product,
  ProductCriteriaInput & Pick<ProductCriteria, 'authorId'>,
  ProductCriteria
> {
  public toCriteria(
    dto: ProductCriteriaInput & Pick<ProductCriteria, 'authorId'>,
  ): ProductCriteria {
    return new ProductCriteria({
      id: dto?.id,
      code: dto?.code,
      label: dto?.label,
      authorId: dto?.authorId,
    });
  }

  public toDto(entity: Product): ProductDto {
    return new ProductDto({
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
