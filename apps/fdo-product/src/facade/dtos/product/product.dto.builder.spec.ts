import { ProductDto } from './product.dto';
import { ProductDtoBuilder } from './product.dto.builder';

describe('ProductDtoBuilder', () => {
  it('successfully set own fields', () => {
    const product: ProductDto = new ProductDtoBuilder()
      .setCode('code')
      .setLabel('label')
      .build();
    expect(product.code).toEqual('code');
    expect(product.label).toEqual('label');
  });

  it('successfully set inherited fields', () => {
    const sharedDate = new Date();
    const product: ProductDto = new ProductDtoBuilder()
      .setId('id')
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(product.id).toEqual('id');
    expect(product.createdAt).toEqual(sharedDate);
    expect(product.updatedAt).toEqual(sharedDate);
  });
});
