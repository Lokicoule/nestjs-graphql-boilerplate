import { ProductDtoBuilder } from '../product/product.dto.builder';
import { OrderItemDto } from './order-item.dto';
import { OrderItemDtoBuilder } from './order-item.dto.builder';

describe('OrderItemDtoBuilder', () => {
  it('successfully set own fields', () => {
    const orderItem: OrderItemDto = new OrderItemDtoBuilder()
      .setAmount(1)
      .setBatchNumber('batchNumber')
      .setBestBeforeDate(new Date())
      .setContainerNumber('containerNumber')
      .setUnitPrice(1)
      .setProduct(
        new ProductDtoBuilder().setCode('code').setLabel('label').build(),
      )
      .build();

    expect(orderItem.amount).toEqual(1);
    expect(orderItem.batchNumber).toEqual('batchNumber');
    expect(orderItem.bestBeforeDate).toBeDefined();
    expect(orderItem.containerNumber).toEqual('containerNumber');
    expect(orderItem.unitPrice).toEqual(1);
    expect(orderItem.product.code).toEqual('code');
    expect(orderItem.product.label).toEqual('label');
  });

  it('successfully set inherited fields', () => {
    const sharedDate = new Date();
    const orderItem: OrderItemDto = new OrderItemDtoBuilder()
      .setId('id')
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(orderItem.id).toEqual('id');
    expect(orderItem.createdAt).toEqual(sharedDate);
    expect(orderItem.updatedAt).toEqual(sharedDate);
  });
});
