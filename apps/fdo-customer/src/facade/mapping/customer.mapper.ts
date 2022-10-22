import { Customer } from '../../domain/entities/customer.entity';
import { CustomerBuilder } from '../../domain/entities/customer.entity.builder';
import { CustomerDto } from '../dtos/customer/customer.dto';
import { CustomerDtoBuilder } from '../dtos/customer/customer.dto.builder';
import { CustomerInput } from '../dtos/customer/customer.input';
import { AddressMapper } from './address.mapper';

/**
 * @class CustomerMapper
 * @description Mapper for Customer
 */
export class CustomerMapper {
  /**
   * @method mapToDto
   * @description Maps a Customer to a CustomerDto
   * @param {Customer} customer - The Customer to map
   * @returns {CustomerDto} - The mapped CustomerDto
   */
  public static mapToDto(customer: Customer): CustomerDto {
    const customerDto = new CustomerDtoBuilder()
      .setId(customer.id?.toString())
      .setCreatedAt(customer.createdAt)
      .setUpdatedAt(customer.updatedAt)
      .setCode(customer.code)
      .setName(customer.name)
      .setAddresses(
        customer.addresses.map((address) => AddressMapper.mapToDto(address)),
      )
      .build();
    return customerDto;
  }

  /**
   * @method mapToEntity
   * @description Maps a CustomerDto to a Customer
   * @param {CustomerDto | CustomerInput} customerDto - The CustomerDto or the CustomerInput to map
   * @returns {Customer} - The mapped Customer
   *  */
  public static mapToEntity(
    customerDto: CustomerDto | CustomerInput,
  ): Customer {
    const customer = new CustomerBuilder()
      .setCode(customerDto.code)
      .setName(customerDto.name)
      .setAddresses(
        customerDto.addresses.map((addressDto) =>
          AddressMapper.mapToEntity(addressDto),
        ),
      )
      .build();
    return customer;
  }
}
