import { PropertyKeyEnum } from '../../../domain/enums/property/property.enum';
import { Property } from '../../../domain/entities/property/property.entity';
import { PropertyDtoBuilder } from '../../dtos/property/property.dto.builder';
import { PropertyInput } from '../../dtos/property/property.input';
import { PropertyMapper } from './property.mapper';

describe('PropertyMapper', () => {
  describe('mapToDto', () => {
    it('successfully maps an entity to a DTO', () => {
      const propertyEntity = new Property.Builder()
        .setKey(PropertyKeyEnum.COUNTER)
        .setValue('value')
        .build();
      const propertyDto = PropertyMapper.mapToDto(propertyEntity);
      expect(propertyDto.key).toEqual(propertyEntity.key);
      expect(propertyDto.value).toEqual(propertyEntity.value);
    });

    it('successfully maps an entity to a DTO with inherited fields and invalid id', () => {
      const propertyEntity = new Property.Builder()
        .setId('invalid')
        .setKey(PropertyKeyEnum.COUNTER)
        .setValue('value')
        .build();
      const propertyDto = PropertyMapper.mapToDto(propertyEntity);
      expect(propertyDto.id).toBeUndefined();
      expect(propertyDto.key).toEqual(propertyEntity.key);
      expect(propertyDto.value).toEqual(propertyEntity.value);
    });

    it('successfully maps an entity to a DTO with inherited fields and valid id', () => {
      const propertyEntity = new Property.Builder()
        .setId('id')
        .setKey(PropertyKeyEnum.COUNTER)
        .setValue('value')
        .build();
      const propertyDto = PropertyMapper.mapToDto(propertyEntity);
      expect(propertyDto.id).toEqual(propertyEntity._id);
      expect(propertyDto.key).toEqual(propertyEntity.key);
      expect(propertyDto.value).toEqual(propertyEntity.value);
    });
  });

  describe('mapToEntity', () => {
    it('successfully maps a DTO to an entity', () => {
      const propertyDto = new PropertyDtoBuilder()
        .setKey(PropertyKeyEnum.COUNTER)
        .setValue('value')
        .build();
      const propertyEntity = PropertyMapper.mapToEntity(propertyDto);
      expect(propertyEntity.key).toEqual(propertyDto.key);
      expect(propertyEntity.value).toEqual(propertyDto.value);
    });

    it('successfully maps an Input to an entity', () => {
      const propertyInput: PropertyInput = {
        key: PropertyKeyEnum.COUNTER,
        value: 'value',
      } as PropertyInput;
      const propertyEntity = PropertyMapper.mapToEntity(propertyInput);
      expect(propertyEntity.key).toEqual(propertyInput.key);
      expect(propertyEntity.value).toEqual(propertyInput.value);
    });
  });
});
