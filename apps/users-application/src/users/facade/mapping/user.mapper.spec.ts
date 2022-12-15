import { Address } from '../../domain/entities/address/address.entity';
import { Company } from '../../domain/entities/company/company.entity';
import { User } from '../../domain/entities/user/user.entity';
import { UserInput } from '../dtos/inputs/user.input';
import { UserDto } from '../dtos/user.dto';
import { UserMapper } from './user.mapper';

describe('UserMapper', () => {
  describe('toEntity', () => {
    it('should return user', () => {
      const userInput: UserInput = {
        id: 'id',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        phone: 'phone',
        address: {
          id: 'id',
          address: 'address',
          city: 'city',
          country: 'country',
          zipCode: 'zipCode',
          additionalAddress: 'additionalAddress',
        },
        company: {
          id: 'id',
          name: 'name',
          rcsNumber: 'rcsNumber',
          vatNumber: 'vatNumber',
          sirenNumber: 'sirenNumber',
          siretNumber: 'siretNumber',
        },
      };

      const user: User = UserMapper.toEntity(userInput);

      expect(user).toEqual({
        _id: 'id',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        phone: 'phone',
        address: {
          _id: 'id',
          address: 'address',
          city: 'city',
          country: 'country',
          zipCode: 'zipCode',
          additionalAddress: 'additionalAddress',
        },
        company: {
          _id: 'id',
          name: 'name',
          rcsNumber: 'rcsNumber',
          vatNumber: 'vatNumber',
          sirenNumber: 'sirenNumber',
          siretNumber: 'siretNumber',
        },
      });
    });
  });

  describe('toDto', () => {
    it('should return userDto', () => {
      const user: User = new User({
        _id: 'id',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        phone: 'phone',
        address: new Address({
          _id: 'id',
          address: 'address',
          city: 'city',
          country: 'country',
          zipCode: 'zipCode',
          additionalAddress: 'additionalAddress',
        }),
        company: new Company({
          _id: 'id',
          name: 'name',
          rcsNumber: 'rcsNumber',
          vatNumber: 'vatNumber',
          sirenNumber: 'sirenNumber',
          siretNumber: 'siretNumber',
        }),
      });

      const userDto: UserDto = UserMapper.toDto(user);

      expect(userDto).toEqual({
        id: 'id',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        phone: 'phone',
        address: {
          id: 'id',
          address: 'address',
          city: 'city',
          country: 'country',
          zipCode: 'zipCode',
          additionalAddress: 'additionalAddress',
        },
        company: {
          id: 'id',
          name: 'name',
          rcsNumber: 'rcsNumber',
          vatNumber: 'vatNumber',
          sirenNumber: 'sirenNumber',
          siretNumber: 'siretNumber',
        },
      });
    });
  });
});
