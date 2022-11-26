import { AddressDtoBuilder } from '../address/address.dto.builder';
import { UserDto } from './user.dto';
import { UserDtoBuilder } from './user.dto.builder';

describe('UserDtoBuilder', () => {
  it('successfully set own fields', () => {
    const user: UserDto = new UserDtoBuilder()
      .setFirstName('John')
      .setLastName('Doe')
      .setEmail('toto@email.com')
      .setPhone('0123456789')
      .setAddress(new AddressDtoBuilder().build())
      .build();

    expect(user.firstName).toEqual('John');
    expect(user.lastName).toEqual('Doe');
    expect(user.email).toEqual('toto@email.com');
    expect(user.phone).toEqual('0123456789');
    expect(user.address).toBeDefined();
  });

  it('successfully set inherited fields', () => {
    const sharedDate = new Date();
    const user: UserDto = new UserDtoBuilder()
      .setId('id')
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(user.id).toEqual('id');
    expect(user.createdAt).toEqual(sharedDate);
    expect(user.updatedAt).toEqual(sharedDate);
  });
});
