import { Address } from '../../../domain/entities/address/address.entity';
import { AddressDto } from '../../dtos/address/address.dto';
import { AddressDtoBuilder } from '../../dtos/address/address.dto.builder';
import { AddressInput } from '../../dtos/address/address.input';
import { AddressMapper } from './address.mapper';

describe('AddressMapper', () => {
  describe('mapToDto', () => {
    it('successfully maps an entity to a DTO', () => {
      const addressEntity = new Address.Builder()
        .setAddress('address')
        .setCity('city')
        .setAdditionalAddress('additionalAddress')
        .setZipCode('zipCode')
        .setCountry('country')
        .build();

      const addressDto = AddressMapper.mapToDto(addressEntity);
      expect(addressDto.city).toEqual(addressEntity.city);
      expect(addressDto.country).toEqual(addressEntity.country);
      expect(addressDto.additionalAddress).toEqual(
        addressEntity.additionalAddress,
      );
      expect(addressDto.address).toEqual(addressEntity.address);
      expect(addressDto.zipCode).toEqual(addressEntity.zipCode);
    });

    it('successfully maps an entity to a DTO with inherited fields and invalid id', () => {
      const sharedDate = new Date();
      const addressEntity = new Address.Builder()
        .setId('id')
        .setCreatedAt(sharedDate)
        .setUpdatedAt(sharedDate)
        .build();

      const addressDto = AddressMapper.mapToDto(addressEntity);
      expect(addressDto.id).toEqual(addressEntity._id);
      expect(addressDto.id).toBeUndefined();
      expect(addressDto.createdAt).toEqual(addressEntity.createdAt);
      expect(addressDto.updatedAt).toEqual(addressEntity.updatedAt);
    });

    it('successfully maps an entity to a DTO with inherited fields and valid id', () => {
      const sharedDate = new Date();
      const addressEntity = new Address.Builder()
        .setId(1)
        .setCreatedAt(sharedDate)
        .setUpdatedAt(sharedDate)
        .build();

      const addressDto = AddressMapper.mapToDto(addressEntity);
      expect(JSON.stringify(addressDto.id)).toEqual(
        JSON.stringify(addressEntity._id),
      );
      expect(addressDto.createdAt).toEqual(addressEntity.createdAt);
      expect(addressDto.updatedAt).toEqual(addressEntity.updatedAt);
    });
  });

  describe('mapToEntity', () => {
    it('successfully maps a DTO to an entity', () => {
      const addressDto: AddressDto = new AddressDtoBuilder()
        .setCity('Mimizan')
        .setCountry('France')
        .setZipCode('40200')
        .build();

      const addressEntity = AddressMapper.mapToEntity(addressDto);
      expect(addressEntity.city).toEqual(addressDto.city);
      expect(addressEntity.country).toEqual(addressDto.country);
      expect(addressEntity.zipCode).toEqual(addressDto.zipCode);
    });

    it('successfully maps an Input to an entity', () => {
      const addressInput: AddressInput = {
        address: 'address',
        city: 'city',
        additionalAddress: 'additionalAddress',
        zipCode: 'zipCode',
        country: 'country',
      } as AddressInput;

      const addressEntity = AddressMapper.mapToEntity(addressInput);
      expect(addressEntity.city).toEqual(addressInput.city);
      expect(addressEntity.country).toEqual(addressInput.country);
      expect(addressEntity.zipCode).toEqual(addressInput.zipCode);
      expect(addressEntity.additionalAddress).toEqual(
        addressInput.additionalAddress,
      );
      expect(addressEntity.address).toEqual(addressInput.address);
    });
  });
});
