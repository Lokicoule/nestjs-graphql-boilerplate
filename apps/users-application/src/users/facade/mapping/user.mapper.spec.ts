import { Address } from '../../domain/entities/address/address.entity';
import { Company } from '../../domain/entities/company/company.entity';
import { User } from '../../domain/entities/user/user.entity';
import { UserInput } from '../dtos/inputs/user.input';
import { UserDto } from '../dtos/user.dto';
import { UserMapper } from './user.mapper';
import { Types } from 'mongoose';

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
        _id: userInput.id,
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        email: userInput.email,
        phone: userInput.phone,
        address: {
          _id: userInput.address?.id,
          address: userInput.address?.address,
          city: userInput.address?.city,
          country: userInput.address?.country,
          zipCode: userInput.address?.zipCode,
          additionalAddress: userInput.address?.additionalAddress,
        },
        company: {
          _id: userInput.company?.id,
          name: userInput.company?.name,
          rcsNumber: userInput.company?.rcsNumber,
          vatNumber: userInput.company?.vatNumber,
          sirenNumber: userInput.company?.sirenNumber,
          siretNumber: userInput.company?.siretNumber,
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
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: {
          id: user.address?._id?.toString(),
          address: user.address?.address,
          city: user.address?.city,
          country: user.address?.country,
          zipCode: user.address?.zipCode,
          additionalAddress: user.address?.additionalAddress,
        },
        company: {
          id: user.company?._id?.toString(),
          name: user.company?.name,
          rcsNumber: user.company?.rcsNumber,
          vatNumber: user.company?.vatNumber,
          sirenNumber: user.company?.sirenNumber,
          siretNumber: user.company?.siretNumber,
        },
      });
    });
  });
});
