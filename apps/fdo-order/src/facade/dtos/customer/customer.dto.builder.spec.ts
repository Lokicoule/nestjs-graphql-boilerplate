import { AddressDtoBuilder } from '../address/address.dto.builder';
import { CustomerDto } from './customer.dto';
import { CustomerDtoBuilder } from './customer.dto.builder';

describe('CustomerDtoBuilder', () => {
  it('successfully set own fields', () => {
    const customer: CustomerDto = new CustomerDtoBuilder()
      .setCode('code')
      .setName('name')
      .setDeliveryAddress(new AddressDtoBuilder().setCity('city').build())
      .setInvoiceAddress(new AddressDtoBuilder().setCity('Mimizan').build())
      .build();
    expect(customer.code).toEqual('code');
    expect(customer.name).toEqual('name');
    expect(customer.deliveryAddress.city).toEqual('city');
    expect(customer.invoiceAddress.city).toEqual('Mimizan');
  });

  it('successfully set inherited fields', () => {
    const sharedDate = new Date();
    const customer: CustomerDto = new CustomerDtoBuilder()
      .setId('id')
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(customer.id).toEqual('id');
    expect(customer.createdAt).toEqual(sharedDate);
    expect(customer.updatedAt).toEqual(sharedDate);
  });
});
