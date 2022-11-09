import { ProductBuilder } from '../product/product.entity.builder';
import { OrderItem } from './order-item.entity';

describe('OrderItemBuilder', () => {
  it('successfully set own fields', () => {
    const orderItem: OrderItem = new OrderItem.Builder()
      .setProduct(
        new ProductBuilder().setCode('code').setLabel('label').build(),
      )
      .setAmount(1)
      .setUnitPrice(1)
      .setBatchNumber('batchNumber')
      .setContainerNumber('containerNumber')
      .setBestBeforeDate(new Date())
      .build();
    expect(orderItem.product.code).toEqual('code');
    expect(orderItem.product.label).toEqual('label');
    expect(orderItem.amount).toEqual(1);
    expect(orderItem.unitPrice).toEqual(1);
    expect(orderItem.batchNumber).toEqual('batchNumber');
    expect(orderItem.containerNumber).toEqual('containerNumber');
    expect(orderItem.bestBeforeDate).toBeDefined();
  });

  it('successfully set inherited fields', () => {
    const sharedDate = new Date();
    const orderItem: OrderItem = new OrderItem.Builder()
      .setId(1)
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(orderItem._id).toBeDefined();
    expect(orderItem.createdAt).toEqual(sharedDate);
    expect(orderItem.updatedAt).toEqual(sharedDate);
  });
});
