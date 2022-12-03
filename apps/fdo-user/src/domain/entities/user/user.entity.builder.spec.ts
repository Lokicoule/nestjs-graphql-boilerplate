import { Address } from '../address/address.entity';
import { Company } from '../company/company.entity';
import { User } from './user.entity';

describe('UserBuilder', () => {
  it('successfully set own fields', () => {
    const user: User = new User.Builder()
      .setFirstName('firstName')
      .setLastName('lastName')
      .setEmail('email')
      .setPhone('phone')
      .setAddress(
        new Address.Builder()
          .setCountry('country')
          .setCity('city')
          .setAdditionalAddress('additionalAddress')
          .setAddress('address')
          .build(),
      )
      .setCompany(
        new Company.Builder()
          .setName('name')
          .setRcsNumber('RCS FR 1234567544')
          .setSiret('12345678901234')
          .build(),
      )
      .build();

    expect(user.firstName).toEqual('firstName');
    expect(user.lastName).toEqual('lastName');
    expect(user.email).toEqual('email');
    expect(user.phone).toEqual('phone');
    expect(user.address).toBeDefined();
    expect(user.company).toBeDefined();
  });

  it('successfully set inherited fields', () => {
    const sharedDate = new Date();
    const user: User = new User.Builder()
      .setId(1)
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(user._id).toBeDefined();
    expect(user.createdAt).toEqual(sharedDate);
    expect(user.updatedAt).toEqual(sharedDate);
  });
});
