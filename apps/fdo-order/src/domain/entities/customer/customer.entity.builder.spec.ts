import { Address } from '../address/address.entity';
import { Customer } from './customer.entity';

describe('CustomerBuilder', () => {
  it('successfully set own fields', () => {
    const customer: Customer = new Customer.Builder()
      .setCode('code')
      .setName('name')
      .setDeliveryAddress(new Address.Builder().setCity('city').build())
      .setInvoiceAddress(new Address.Builder().setCountry('France').build())
      .build();
    expect(customer.code).toEqual('code');
    expect(customer.name).toEqual('name');
    expect(customer.deliveryAddress.city).toEqual('city');
    expect(customer.invoiceAddress.country).toEqual('France');
  });

  it('successfully set inherited fields', () => {
    const sharedDate = new Date();
    const customer: Customer = new Customer.Builder()
      .setId(1)
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(customer._id).toBeDefined();
    expect(customer.createdAt).toEqual(sharedDate);
    expect(customer.updatedAt).toEqual(sharedDate);
  });
});
