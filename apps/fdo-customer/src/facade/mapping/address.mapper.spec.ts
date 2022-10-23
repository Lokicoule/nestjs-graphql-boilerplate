import { AddressBuilder } from '../../domain/entities/address/address.entity.builder';
import { AddressDto } from '../dtos/address/address.dto';
import { AddressDtoBuilder } from '../dtos/address/address.dto.builder';
import { AddressInput } from '../dtos/address/address.input';
import { AddressMapper } from './address.mapper';

describe('AddressMapper', () => {
  describe('mapToDto', () => {
    it('successfully maps an entity to a DTO', () => {
      const addressEntity = new AddressBuilder()
        .setStreet('street')
        .setCity('city')
        .setState('state')
        .setZipCode('zipCode')
        .setCountry('country')
        .build();

      const addressDto = AddressMapper.mapToDto(addressEntity);
      expect(addressDto.city).toEqual(addressEntity.city);
      expect(addressDto.country).toEqual(addressEntity.country);
      expect(addressDto.state).toEqual(addressEntity.state);
      expect(addressDto.street).toEqual(addressEntity.street);
      expect(addressDto.zipCode).toEqual(addressEntity.zipCode);
    });

    it('successfully maps an entity to a DTO with inherited fields and invalid id', () => {
      const sharedDate = new Date();
      const addressEntity = new AddressBuilder()
        .setId('id')
        .setCreatedAt(sharedDate)
        .setUpdatedAt(sharedDate)
        .build();

      const addressDto = AddressMapper.mapToDto(addressEntity);
      expect(addressDto.id).toEqual(addressEntity.id);
      expect(addressDto.id).toBeUndefined();
      expect(addressDto.createdAt).toEqual(addressEntity.createdAt);
      expect(addressDto.updatedAt).toEqual(addressEntity.updatedAt);
    });

    it('successfully maps an entity to a DTO with inherited fields and valid id', () => {
      const sharedDate = new Date();
      const addressEntity = new AddressBuilder()
        .setId(1)
        .setCreatedAt(sharedDate)
        .setUpdatedAt(sharedDate)
        .build();

      const addressDto = AddressMapper.mapToDto(addressEntity);
      expect(JSON.stringify(addressDto.id)).toEqual(
        JSON.stringify(addressEntity.id),
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
        street: 'street',
        city: 'city',
        state: 'state',
        zipCode: 'zipCode',
        country: 'country',
      } as AddressInput;

      const addressEntity = AddressMapper.mapToEntity(addressInput);
      expect(addressEntity.city).toEqual(addressInput.city);
      expect(addressEntity.country).toEqual(addressInput.country);
      expect(addressEntity.zipCode).toEqual(addressInput.zipCode);
      expect(addressEntity.state).toEqual(addressInput.state);
      expect(addressEntity.street).toEqual(addressInput.street);
    });
  });
});
