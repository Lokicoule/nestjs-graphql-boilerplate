import { AddressBuilder } from '../address/address.entity.builder';
import { Customer } from './customer.entity';
import { CustomerBuilder } from './customer.entity.builder';

describe('CustomerBuilder', () => {
  it('successfully set own fields', () => {
    const customer: Customer = new CustomerBuilder()
      .setCode('code')
      .setName('name')
      .setAddresses([
        new AddressBuilder()
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
    const customer: Customer = new CustomerBuilder()
      .setId(1)
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(customer.id).toBeDefined();
    expect(customer.createdAt).toEqual(sharedDate);
    expect(customer.updatedAt).toEqual(sharedDate);
  });
});
