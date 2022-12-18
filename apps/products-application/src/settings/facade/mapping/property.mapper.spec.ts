import { Property } from '../../domain/entities/property.entity';
import { PropertyInput } from '../dtos/inputs/property.input';
import { PropertyDto } from '../dtos/property.dto';
import { PropertyMapper } from './property.mapper';
import { Test, TestingModule } from '@nestjs/testing';

import { PropertyEnum } from '../../domain/enums/property.enum';

describe('PropertyMapper', () => {
  let propertyMapper: PropertyMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyMapper],
    }).compile();

    propertyMapper = module.get<PropertyMapper>(PropertyMapper);
  });

  it('should be defined', () => {
    expect(propertyMapper).toBeDefined();
  });
  describe('toEntity', () => {
    it('should return property', () => {
      const propertyInput: PropertyInput = {
        id: 'id',
        key: PropertyEnum.getEnum().COUNTER,
        value: 'value',
      };

      const property: Property = propertyMapper.toEntity(propertyInput);

      expect(property).toEqual({
        _id: propertyInput.id,
        key: propertyInput.key,
        value: propertyInput.value,
      });
    });
  });

  describe('toDto', () => {
    it('should return propertyDto', () => {
      const property: Property = new Property({
        _id: 'id',
        key: PropertyEnum.getEnum().COUNTER,
        value: 'value',
      });

      const propertyDto: PropertyDto = propertyMapper.toDto(property);

      expect(propertyDto).toEqual({
        id: property._id?.toString(),
        key: property.key,
        value: property.value,
      });
    });
  });
});
