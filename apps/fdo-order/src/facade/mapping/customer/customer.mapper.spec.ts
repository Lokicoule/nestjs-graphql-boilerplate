import { Address } from '../../../domain/entities/address/address.entity';
import { Customer } from '../../../domain/entities/customer/customer.entity';
import { CustomerCriteriaInput } from '../../dtos/customer/customer-criteria.input';
import { CustomerDto } from '../../dtos/customer/customer.dto';
import { CustomerDtoBuilder } from '../../dtos/customer/customer.dto.builder';
import { CustomerMapper } from './customer.mapper';

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
      const customerEntity: Customer = new Customer.Builder()
        .setCode('code')
        .setName('name')
        .setDeliveryAddress(
          new Address.Builder()
            .setStreet('street')
            .setZipCode('zipCode')
            .setCity('city')
            .setCountry('country')
            .build(),
        )
        .setInvoiceAddress(
          new Address.Builder()
            .setStreet('street')
            .setZipCode('zipCode')
            .setCity('city')
            .setCountry('country')
            .build(),
        )
        .build();
      const customerDto: CustomerDto = CustomerMapper.mapToDto(customerEntity);

      expect(customerDto.code).toEqual(customerEntity.code);
      expect(customerDto.name).toEqual(customerEntity.name);
      expect(customerDto.deliveryAddress.city).toEqual(
        customerEntity.deliveryAddress.city,
      );
      expect(customerDto.deliveryAddress.country).toEqual(
        customerEntity.deliveryAddress.country,
      );
      expect(customerDto.deliveryAddress.state).toEqual(
        customerEntity.deliveryAddress.state,
      );
      expect(customerDto.deliveryAddress.street).toEqual(
        customerEntity.deliveryAddress.street,
      );
      expect(customerDto.deliveryAddress.zipCode).toEqual(
        customerEntity.deliveryAddress.zipCode,
      );
      expect(customerDto.invoiceAddress.city).toEqual(
        customerEntity.invoiceAddress.city,
      );
      expect(customerDto.invoiceAddress.country).toEqual(
        customerEntity.invoiceAddress.country,
      );
      expect(customerDto.invoiceAddress.state).toEqual(
        customerEntity.invoiceAddress.state,
      );
      expect(customerDto.invoiceAddress.street).toEqual(
        customerEntity.invoiceAddress.street,
      );
      expect(customerDto.invoiceAddress.zipCode).toEqual(
        customerEntity.invoiceAddress.zipCode,
      );
    });

    it('successfully maps an entity to a DTO with inherited fields and invalid id', () => {
      const sharedDate = new Date();
      const customerEntity = new Customer.Builder()
        .setId('id')
        .setCreatedAt(sharedDate)
        .setUpdatedAt(sharedDate)
        .setCode('code')
        .build();

      const customerDto = CustomerMapper.mapToDto(customerEntity);
      expect(customerDto.id).toEqual(customerEntity._id);
      expect(customerDto.id).toBeUndefined();
      expect(customerDto.createdAt).toEqual(customerEntity.createdAt);
      expect(customerDto.updatedAt).toEqual(customerEntity.updatedAt);
    });

    it('successfully maps an entity to a DTO with inherited fields and valid id', () => {
      const sharedDate = new Date();
      const customerEntity = new Customer.Builder()
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
        .build();
      const customerEntity: Customer = CustomerMapper.mapToEntity(customerDto);
      expect(JSON.stringify(customerEntity._id)).toEqual(
        JSON.stringify(customerDto.id),
      );
      expect(customerEntity.code).toEqual(customerDto.code);
      expect(customerEntity.name).toEqual(customerDto.name);
    });
  });
});
