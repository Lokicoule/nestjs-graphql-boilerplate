import { Customer } from '../../../domain/entities/customer/customer.entity';
import { CustomerCreateInput } from '../../dtos/customer/inputs/customer-create.input';
import { CustomerUpdateInput } from '../../dtos/customer/inputs/customer-update.input';
import { CustomerDto } from '../../dtos/customer/customer.dto';
import { CustomerDtoBuilder } from '../../dtos/customer/customer.dto.builder';
import { AddressMapper } from '../address/address.mapper';
import { CustomerCriteriaInput } from '../../dtos/customer/inputs/customer-criteria.input';
import { CustomerCriteria } from '../../../domain/criterias/customer/customer.criteria';
import { CustomerCriteriaBuilder } from '../../../domain/criterias/customer/customer.criteria.builder';

/**
 * @class CustomerMapper
 * @description Mapper for Customer
 */
export class CustomerMapper {
  /**
   * @method mapCriteriaInputToCriteria
   * @description Maps a CustomerCriteriaInput to a CustomerCriteria
   * @param {CustomerCriteriaInput} customerCriteriaInput - The CustomerCriteriaInput to map
   * @returns {CustomerCriteria} - The mapped CustomerCriteria
   */
  public static mapCriteriaInputToCriteria(
    customerCriteria: CustomerCriteriaInput,
  ): CustomerCriteria {
    const criteriaBuilder = new CustomerCriteriaBuilder()
      .withId(customerCriteria?.id)
      .withCode(customerCriteria?.code)
      .withName(customerCriteria?.name);
    return criteriaBuilder.buildCriteria();
  }

  /**
   * @method mapToDto
   * @description Maps a Customer to a CustomerDto
   * @param {Customer} customer - The Customer to map
   * @returns {CustomerDto} - The mapped CustomerDto
   */
  public static mapToDto(customer: Customer): CustomerDto {
    const customerDto = new CustomerDtoBuilder()
      .setId(customer._id?.toString())
      .setCreatedAt(customer.createdAt)
      .setUpdatedAt(customer.updatedAt)
      .setCode(customer.code)
      .setName(customer.name)
      .setAddresses(
        customer.addresses?.map((address) => AddressMapper.mapToDto(address)),
      )
      .build();
    return customerDto;
  }

  /**
   * @method mapListToDtoList
   * @description Maps a list of Customers to a list of CustomerDtos
   * @param {Customer[]} customers - The list of Customers to map
   * @returns {CustomerDto[]} - The mapped list of CustomerDtos
   */
  public static mapListToDtoList(customers: Customer[]): CustomerDto[] {
    return customers.map((customer) => CustomerMapper.mapToDto(customer));
  }

  /**
   * @method mapToEntity
   * @description Maps a CustomerDto to a Customer
   * @param {CustomerDto | CustomerUpdateInput | CustomerCreateInput} customerDto - The CustomerDto or the CustomerUpdateInput or the CustomerCreateInput to map
   * @returns {Customer} - The mapped Customer
   */
  public static mapToEntity(
    customerDto: CustomerDto | CustomerUpdateInput | CustomerCreateInput,
  ): Customer {
    const customer = new Customer.Builder()
      .setId(this.hasId(customerDto) && customerDto.id)
      .setCode(customerDto?.code)
      .setName(customerDto.name)
      .setAddresses(
        customerDto.addresses?.map((addressDto) =>
          AddressMapper.mapToEntity(addressDto),
        ),
      )
      .build();

    return customer;
  }

  /**
   * @method hasId
   * @description Type guard to check if the CustomerDto has an id
   * @param {CustomerDto} customerDto - The CustomerDto to check
   * @returns {boolean} - True if the CustomerDto has an id, false otherwise
   */
  private static hasId(
    customerDto: CustomerDto | CustomerUpdateInput | CustomerCreateInput,
  ): customerDto is CustomerDto {
    return Boolean((customerDto as CustomerDto).id);
  }
}
