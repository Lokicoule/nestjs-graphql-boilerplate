import { OrderLifeCycleEnum } from '../../../domain/enums/order/order.enum';
import { OrderCustomerDtoBuilder } from '../customer/customer.dto.builder';
import { OrderItemDtoBuilder } from '../order-item/order-item.dto.builder';
import { ProductDtoBuilder } from '../product/product.dto.builder';
import { OrderDto } from './order.dto';
import { OrderDtoBuilder } from './order.dto.builder';

describe('OrderDtoBuilder', () => {
  it('successfully set own fields', () => {
    const order: OrderDto = new OrderDtoBuilder()
      .setCode('code')
      .setBillingDate(new Date())
      .setDueDate(new Date())
      .setCustomer(new OrderCustomerDtoBuilder().setCode('code').build())
      .setItems([
        new OrderItemDtoBuilder()
          .setProduct(new ProductDtoBuilder().setCode('code').build())
          .setAmount(1)
          .setUnitPrice(1)
          .build(),
      ])
      .setLifeCycle(OrderLifeCycleEnum.CREATED)
      .build();
    expect(order.code).toEqual('code');
    expect(order.billingDate).toBeDefined();
    expect(order.dueDate).toBeDefined();
    expect(order.customer.code).toEqual('code');
    expect(order.items[0].product.code).toEqual('code');
    expect(order.items[0].amount).toEqual(1);
    expect(order.items[0].unitPrice).toEqual(1);
    expect(order.lifeCycle).toEqual(OrderLifeCycleEnum.CREATED);
  });

  it('successfully set inherited fields', () => {
    const sharedDate = new Date();
    const order: OrderDto = new OrderDtoBuilder()
      .setId('id')
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(order.id).toEqual('id');
    expect(order.createdAt).toEqual(sharedDate);
    expect(order.updatedAt).toEqual(sharedDate);
  });
});
