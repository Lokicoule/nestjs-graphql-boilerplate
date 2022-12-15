import { Address } from '../../domain/entities/address/address.entity';
import { AddressDto } from '../dtos/address.dto';
import { AddressInput } from '../dtos/inputs/address.input';
import { AddressMapper } from './address.mapper';

describe('AddressMapper', () => {
  describe('toEntity', () => {
    it('should return address', () => {
      const addressInput: AddressInput = {
        id: 'id',
        address: 'address',
        city: 'city',
        country: 'country',
        zipCode: 'zipCode',
        additionalAddress: 'additionalAddress',
      };

      const address: Address = AddressMapper.toEntity(addressInput);

      expect(address).toEqual({
        _id: 'id',
        address: 'address',
        city: 'city',
        country: 'country',
        zipCode: 'zipCode',
        additionalAddress: 'additionalAddress',
      });
    });
  });

  describe('toDto', () => {
    it('should return addressDto', () => {
      const address: Address = new Address({
        _id: 'id',
        address: 'address',
        city: 'city',
        country: 'country',
        zipCode: 'zipCode',
        additionalAddress: 'additionalAddress',
      });

      const addressDto: AddressDto = AddressMapper.toDto(address);

      expect(addressDto).toEqual({
        id: 'id',
        address: 'address',
        city: 'city',
        country: 'country',
        zipCode: 'zipCode',
        additionalAddress: 'additionalAddress',
      });
    });
  });
});
