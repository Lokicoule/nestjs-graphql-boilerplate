import { AddressDtoBuilder } from '../address/address.dto.builder';
import { OrderCustomerDto } from './customer.dto';
import { OrderCustomerDtoBuilder } from './customer.dto.builder';

describe('OrderCustomerDtoBuilder', () => {
  it('successfully set own fields', () => {
    const orderCustomer: OrderCustomerDto = new OrderCustomerDtoBuilder()
      .setCode('code')
      .setName('name')
      .setDeliveryAddress(new AddressDtoBuilder().setCity('city').build())
      .setInvoiceAddress(new AddressDtoBuilder().setCity('Mimizan').build())
      .build();
    expect(orderCustomer.code).toEqual('code');
    expect(orderCustomer.name).toEqual('name');
    expect(orderCustomer.deliveryAddress.city).toEqual('city');
    expect(orderCustomer.invoiceAddress.city).toEqual('Mimizan');
  });

  it('successfully set inherited fields', () => {
    const sharedDate = new Date();
    const orderCustomer: OrderCustomerDto = new OrderCustomerDtoBuilder()
      .setId('id')
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(orderCustomer.id).toEqual('id');
    expect(orderCustomer.createdAt).toEqual(sharedDate);
    expect(orderCustomer.updatedAt).toEqual(sharedDate);
  });
});
