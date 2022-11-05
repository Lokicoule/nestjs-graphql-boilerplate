import { Product } from './product.entity';

describe('ProductBuilder', () => {
  it('successfully set own fields', () => {
    const product: Product = new Product.Builder()
      .setCode('code')
      .setLabel('label')
      .build();

    expect(product.code).toEqual('code');
    expect(product.label).toEqual('label');
  });

  it('successfully set inherited fields', () => {
    const sharedDate = new Date();
    const product: Product = new Product.Builder()
      .setId(1)
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(product._id).toBeDefined();
    expect(product.createdAt).toEqual(sharedDate);
    expect(product.updatedAt).toEqual(sharedDate);
  });
});
