import { Product } from '../../../domain/entities/product/product.entity';
import { ProductInput } from '../../dtos/product/product.input';
import { ProductDto } from '../../dtos/product/product.dto';
import { ProductDtoBuilder } from '../../dtos/product/product.dto.builder';

/**
 * @class ProductMapper
 * @description Mapper for Product
 */
export class ProductMapper {
  /**
   * @method mapToDto
   * @description Maps a Product to a ProductDto
   * @param {Product} product - The Product to map
   * @returns {ProductDto} - The mapped ProductDto
   */
  public static mapToDto(product: Product): ProductDto {
    const productDto = new ProductDtoBuilder()
      .setId(product?._id?.toString())
      .setCreatedAt(product?.createdAt)
      .setUpdatedAt(product?.updatedAt)
      .setCode(product?.code)
      .setLabel(product?.label)
      .build();
    return productDto;
  }

  /**
   * @method mapToEntity
   * @description Maps a ProductDto to a Product
   * @param {ProductDto | ProductInput} productDto - The ProductDto or the ProductInput to map
   * @returns {Product} - The mapped Product
   */
  public static mapToEntity(
    productDto: ProductDto | Partial<ProductInput>,
  ): Product {
    const product = new Product.Builder()
      .setId(productDto?.id)
      .setCode(productDto?.code)
      .setLabel(productDto?.label)
      .build();

    return product;
  }
}
