import { AddressBuilder } from '../../domain/entities/address.entity.builder';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerBuilder } from '../../domain/entities/customer.entity.builder';
import { AddressDtoBuilder } from '../dtos/address/address.dto.builder';
import { CustomerDto } from '../dtos/customer/customer.dto';
import { CustomerDtoBuilder } from '../dtos/customer/customer.dto.builder';
import { CustomerMapper } from './customer.mapper';

describe('CustomerMapper', () => {
  describe('mapToDto', () => {
    it('successfully maps an entity to a DTO', () => {
      const customer: Customer = new CustomerBuilder()
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
      const customerDto: CustomerDto = CustomerMapper.mapToDto(customer);

      expect(customerDto.code).toEqual('code');
      expect(customerDto.name).toEqual('name');
      expect(customerDto.addresses[0].city).toEqual('Mimizan');
      expect(customerDto.addresses[0].country).toEqual('France');
      expect(customerDto.addresses[0].zipCode).toEqual('40200');
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
      const customer: Customer = CustomerMapper.mapToEntity(customerDto);

      expect(customer.code).toEqual(customerDto.code);
      expect(customer.name).toEqual(customerDto.name);
      expect(customer.addresses[0].city).toEqual(customerDto.addresses[0].city);
      expect(customer.addresses[0].country).toEqual(
        customerDto.addresses[0].country,
      );
      expect(customer.addresses[0].zipCode).toEqual(
        customerDto.addresses[0].zipCode,
      );
    });
  });
});
