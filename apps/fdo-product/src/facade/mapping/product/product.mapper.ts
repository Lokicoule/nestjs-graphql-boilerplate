import { ProductCriteria } from '../../../domain/criterias/product/product.criteria';
import { ProductCriteriaBuilder } from '../../../domain/criterias/product/product.criteria.builder';
import { Product } from '../../../domain/entities/product/product.entity';
import { ProductCriteriaInput } from '../../dtos/product/inputs/product-criteria.input';
import { ProductInput } from '../../dtos/product/inputs/product.input';
import { ProductDto } from '../../dtos/product/product.dto';
import { ProductDtoBuilder } from '../../dtos/product/product.dto.builder';
import { User } from '@nestjs-cognito/auth';

/**
 * @class ProductMapper
 * @description Mapper for Product
 */
export class ProductMapper {
  /**
   * @method mapCriteriaInputToCriteria
   * @description Maps a ProductCriteriaInput to a ProductCriteria
   * @param {ProductCriteriaInput} productCriteriaInput - The ProductCriteriaInput to map
   * @returns {ProductCriteria} - The mapped ProductCriteria
   */
  public static mapCriteriaInputToCriteria(
    productCriteria: ProductCriteriaInput,
    cognitoUser?: User,
  ): ProductCriteria {
    const criteriaBuilder = new ProductCriteriaBuilder()
      .withId(productCriteria?.id)
      .withCognitoId(cognitoUser?.username)
      .withCode(productCriteria?.code)
      .withLabel(productCriteria?.label);
    return criteriaBuilder.buildCriteria();
  }

  /**
   * @method mapToDto
   * @description Maps a Product to a ProductDto
   * @param {Product} product - The Product to map
   * @returns {ProductDto} - The mapped ProductDto
   */
  public static mapToDto(product: Product): ProductDto {
    const productDto = new ProductDtoBuilder()
      .setId(product._id?.toString())
      .setCreatedAt(product.createdAt)
      .setUpdatedAt(product.updatedAt)
      .setCode(product.code)
      .setLabel(product.label)
      .build();
    return productDto;
  }

  /**
   * @method mapListToDtoList
   * @description Maps a list of Products to a list of ProductDtos
   * @param {Product[]} products - The list of Products to map
   * @returns {ProductDto[]} - The mapped list of ProductDtos
   */
  public static mapListToDtoList(products: Product[]): ProductDto[] {
    return products.map((product) => ProductMapper.mapToDto(product));
  }

  /**
   * @method mapToEntity
   * @description Maps a ProductDto to a Product
   * @param {ProductDto | ProductInput} productDto - The ProductDto or the ProductInput to map
   * @returns {Product} - The mapped Product
   */
  public static mapToEntity(
    productDto: ProductDto | Partial<ProductInput>,
    cognitoUser?: User,
  ): Product {
    const product = new Product.Builder()
      .setId(productDto?.id)
      .setCognitoId(cognitoUser?.username)
      .setCode(productDto?.code)
      .setLabel(productDto.label)
      .build();

    return product;
  }
}
