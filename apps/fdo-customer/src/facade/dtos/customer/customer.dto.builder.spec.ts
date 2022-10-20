import { AddressDtoBuilder } from '../address/address.dto.builder';
import { CustomerDto } from './customer.dto';
import { CustomerDtoBuilder } from './customer.dto.builder';

describe('CustomerDtoBuilder', () => {
  it('successfully set own fields', () => {
    const customer: CustomerDto = new CustomerDtoBuilder()
      .setCode('code')
      .setName('name')
      .setAddresses([
        new AddressDtoBuilder()
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
