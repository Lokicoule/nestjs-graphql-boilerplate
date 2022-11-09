import { Customer } from '../customer/customer.entity';
import { OrderItem } from '../order-item/order-item.entity';
import { Product } from '../product/product.entity';
import { Order } from './order.entity';

describe('OrderBuilder', () => {
  it('successfully set own fields', () => {
    const order: Order = new Order.Builder()
      .setCode('code')
      .setBillingDate(new Date())
      .setDueDate(new Date())
      .setCustomer(
        new Customer.Builder().setCode('code').setName('name').build(),
      )
      .setItems([
        new OrderItem.Builder()
          .setProduct(
            new Product.Builder().setCode('code').setLabel('label').build(),
          )
          .setAmount(1)
          .setUnitPrice(1)
          .setBatchNumber('batchNumber')
          .setContainerNumber('containerNumber')
          .setBestBeforeDate(new Date())
          .build(),
      ])
      .build();

    expect(order.code).toEqual('code');
    expect(order.billingDate).toBeDefined();
    expect(order.dueDate).toBeDefined();
    expect(order.customer.code).toEqual('code');
    expect(order.customer.name).toEqual('name');
    expect(order.items[0].product.code).toEqual('code');
    expect(order.items[0].product.label).toEqual('label');
    expect(order.items[0].amount).toEqual(1);
    expect(order.items[0].unitPrice).toEqual(1);
    expect(order.items[0].batchNumber).toEqual('batchNumber');
    expect(order.items[0].containerNumber).toEqual('containerNumber');
    expect(order.items[0].bestBeforeDate).toBeDefined();
  });

  it('successfully set inherited fields', () => {
    const sharedDate = new Date();
    const order: Order = new Order.Builder()
      .setId(1)
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(order._id).toBeDefined();
    expect(order.createdAt).toEqual(sharedDate);
    expect(order.updatedAt).toEqual(sharedDate);
  });
});
