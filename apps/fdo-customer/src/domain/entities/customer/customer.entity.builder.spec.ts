import { Address } from '../address/address.entity';
import { Customer } from './customer.entity';

describe('CustomerBuilder', () => {
  it('successfully set own fields', () => {
    const customer: Customer = new Customer.Builder()
      .setCode('code')
      .setName('name')
      .setAddresses([
        new Address.Builder()
          .setCity('Mimizan')
          .setCountry('France')
          .setZipCode('40200')
          .build(),
      ])
      .build();
    expect(customer.code).toEqual('code');
    expect(customer.name).toEqual('name');
    expect(customer.addresses[0].city).toEqual('Mimizan');
    expect(customer.addresses[0].country).toEqual('France');
    expect(customer.addresses[0].zipCode).toEqual('40200');
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
