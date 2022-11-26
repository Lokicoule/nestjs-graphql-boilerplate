import { Address } from './address.entity';

describe('AddressBuilder', () => {
  it('successfully set own fields', () => {
    const address: Address = new Address.Builder()
      .setCity('Mimizan')
      .setCountry('France')
      .setZipCode('40200')
      .setState('Landes')
      .setStreet('Rue de la plage')
      .setNumber('1')
      .build();
    expect(address.city).toEqual('Mimizan');
    expect(address.country).toEqual('France');
    expect(address.zipCode).toEqual('40200');
    expect(address.state).toEqual('Landes');
    expect(address.street).toEqual('Rue de la plage');
    expect(address.number).toEqual('1');
  });

  it('successfully set inherited fields', () => {
    const sharedDate = new Date();
    const address: Address = new Address.Builder()
      .setId(1)
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(address._id).toBeDefined();
    expect(address.createdAt).toEqual(sharedDate);
    expect(address.updatedAt).toEqual(sharedDate);
  });
});
