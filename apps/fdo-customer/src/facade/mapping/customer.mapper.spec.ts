import { AddressBuilder } from '../../domain/entities/address/address.entity.builder';
import { Customer } from '../../domain/entities/customer/customer.entity';
import { CustomerBuilder } from '../../domain/entities/customer/customer.entity.builder';
import { AddressDtoBuilder } from '../dtos/address/address.dto.builder';
import { CustomerDto } from '../dtos/customer/customer.dto';
import { CustomerDtoBuilder } from '../dtos/customer/customer.dto.builder';
import { CustomerInput } from '../dtos/customer/customer.input';
import { CustomerMapper } from './customer.mapper';

describe('CustomerMapper', () => {
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
      expect(customerDto.id).toEqual(customerEntity.id);
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
        JSON.stringify(customerEntity.id),
      );
      expect(customerDto.createdAt).toEqual(customerEntity.createdAt);
      expect(customerDto.updatedAt).toEqual(customerEntity.updatedAt);
    });
  });

  describe('mapToEntity', () => {
    it('successfully maps a DTO to an entity', () => {
      const customerDto: CustomerDto = new CustomerDtoBuilder()
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

    it('successfully maps an Input to an entity', () => {
      const customerInput: CustomerInput = {
        code: 'code',
        name: 'name',
        addresses: [
          {
            city: 'Mimizan',
            country: 'France',
            zipCode: '40200',
          },
        ],
      } as CustomerInput;

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
  });
});
