import { AddressBuilder } from '../../domain/entities/address/address.entity.builder';
import { Customer } from '../../domain/entities/customer/customer.entity';
import { CustomerBuilder } from '../../domain/entities/customer/customer.entity.builder';
import { AddressDtoBuilder } from '../dtos/address/address.dto.builder';
import { CustomerCreateInput } from '../dtos/customer/inputs/customer-create.input';
import { CustomerUpdateInput } from '../dtos/customer/inputs/customer-update.input';
import { CustomerDto } from '../dtos/customer/customer.dto';
import { CustomerDtoBuilder } from '../dtos/customer/customer.dto.builder';
import { CustomerMapper } from './customer.mapper';
import { CustomerCriteriaInput } from '../dtos/customer/inputs/customer-criteria.input';

describe('CustomerMapper', () => {
  describe('mapCriteriaInputToCriteria', () => {
    it('should map a CustomerCriteriaInput to a CustomerCriteria', () => {
      const customerCriteriaInput: CustomerCriteriaInput = {
        id: 'id',
        code: 'code',
        name: 'name',
      } as CustomerCriteriaInput;
      const customerCriteria = CustomerMapper.mapCriteriaInputToCriteria(
        customerCriteriaInput,
      );
      expect(customerCriteria).toEqual({
        _id: 'id',
        code: 'code',
        name: 'name',
      });
    });

    it('should map a CustomerCriteriaInput with undefined values to a clean object without undefined properties', () => {
      const customerCriteriaInput: CustomerCriteriaInput = {
        id: undefined,
        code: 'code',
        name: null,
      } as CustomerCriteriaInput;
      const customerCriteria = CustomerMapper.mapCriteriaInputToCriteria(
        customerCriteriaInput,
      );
      expect(customerCriteria).toEqual({
        code: 'code',
      });
    });
  });

  describe('mapToDto', () => {
    it('successfully maps an entity to a DTO', () => {
      const customerEntity: Customer = new CustomerBuilder()
        .setCode('code')
        .setName('name')
        .setAddresses([
          new AddressBuilder()
            .setCity('Mimizan')
            .setCountry('France')
            .setZipCode('40200')
            .build(),
        ])
        .build();
      const customerDto: CustomerDto = CustomerMapper.mapToDto(customerEntity);

      expect(customerDto.code).toEqual(customerEntity.code);
      expect(customerDto.name).toEqual(customerEntity.name);
      expect(customerDto.addresses[0].city).toEqual(
        customerEntity.addresses[0].city,
      );
      expect(customerDto.addresses[0].country).toEqual(
        customerEntity.addresses[0].country,
      );
      expect(customerDto.addresses[0].zipCode).toEqual(
        customerEntity.addresses[0].zipCode,
      );
    });

    it('successfully maps an entity to a DTO with inherited fields and invalid id', () => {
      const sharedDate = new Date();
      const customerEntity = new CustomerBuilder()
        .setId('id')
        .setCreatedAt(sharedDate)
        .setUpdatedAt(sharedDate)
        .build();

      const customerDto = CustomerMapper.mapToDto(customerEntity);
      expect(customerDto.id).toEqual(customerEntity._id);
      expect(customerDto.id).toBeUndefined();
      expect(customerDto.createdAt).toEqual(customerEntity.createdAt);
      expect(customerDto.updatedAt).toEqual(customerEntity.updatedAt);
    });

    it('successfully maps an entity to a DTO with inherited fields and valid id', () => {
      const sharedDate = new Date();
      const customerEntity = new CustomerBuilder()
        .setId(1)
        .setCreatedAt(sharedDate)
        .setUpdatedAt(sharedDate)
        .build();

      const customerDto = CustomerMapper.mapToDto(customerEntity);
      expect(JSON.stringify(customerDto.id)).toEqual(
        JSON.stringify(customerEntity._id),
      );
      expect(customerDto.createdAt).toEqual(customerEntity.createdAt);
      expect(customerDto.updatedAt).toEqual(customerEntity.updatedAt);
    });
  });

  describe('mapToEntity', () => {
    it('successfully maps a DTO to an entity', () => {
      const customerDto: CustomerDto = new CustomerDtoBuilder()
        .setId('5e9e9f9b8e7d6a0e6c6f7b6a')
        .setCode('code')
        .setName('name')
        .setAddresses([
          new AddressDtoBuilder()
            .setCity('Mimizan')
            .setCountry('France')
            .setZipCode('40200')
            .build(),
        ])
        .build();
      const customerEntity: Customer = CustomerMapper.mapToEntity(customerDto);
      expect(JSON.stringify(customerEntity._id)).toEqual(
        JSON.stringify(customerDto.id),
      );
      expect(customerEntity.code).toEqual(customerDto.code);
      expect(customerEntity.name).toEqual(customerDto.name);
      expect(customerEntity.addresses[0].city).toEqual(
        customerDto.addresses[0].city,
      );
      expect(customerEntity.addresses[0].country).toEqual(
        customerDto.addresses[0].country,
      );
      expect(customerEntity.addresses[0].zipCode).toEqual(
        customerDto.addresses[0].zipCode,
      );
    });

    it('successfully maps a CustomerCreateInput to an entity', () => {
      const customerInput: CustomerCreateInput = {
        code: 'code',
        name: 'name',
        addresses: [
          {
            city: 'Mimizan',
            country: 'France',
            zipCode: '40200',
          },
        ],
      } as CustomerCreateInput;

      const customerEntity = CustomerMapper.mapToEntity(customerInput);
      expect(customerEntity.code).toEqual(customerInput.code);
      expect(customerEntity.name).toEqual(customerInput.name);
      expect(customerEntity.addresses[0].city).toEqual(
        customerInput.addresses[0].city,
      );
      expect(customerEntity.addresses[0].country).toEqual(
        customerInput.addresses[0].country,
      );
      expect(customerEntity.addresses[0].zipCode).toEqual(
        customerInput.addresses[0].zipCode,
      );
    });

    it('successfully maps a CustomerUpdateInput to an entity', () => {
      const customerInput: CustomerUpdateInput = {
        id: '5e9e9f9b8e7d6a0e6c6f7b6a',
        code: 'code',
        name: 'name',
        addresses: [
          {
            city: 'Mimizan',
            country: 'France',
            zipCode: '40200',
          },
        ],
      } as CustomerUpdateInput;

      const customerEntity = CustomerMapper.mapToEntity(customerInput);
      expect(JSON.stringify(customerEntity._id)).toEqual(
        JSON.stringify(customerInput.id),
      );
      expect(customerEntity.code).toEqual(customerInput.code);
      expect(customerEntity.name).toEqual(customerInput.name);
      expect(customerEntity.addresses[0].city).toEqual(
        customerInput.addresses[0].city,
      );
      expect(customerEntity.addresses[0].country).toEqual(
        customerInput.addresses[0].country,
      );
      expect(customerEntity.addresses[0].zipCode).toEqual(
        customerInput.addresses[0].zipCode,
      );
    });
  });
});
