import { Customer } from '../../../domain/entities/customer/customer.entity';
import { OrderCustomerDto } from '../../dtos/customer/customer.dto';
import { OrderCustomerDtoBuilder } from '../../dtos/customer/customer.dto.builder';
import { AddressMapper } from '../address/address.mapper';
import { CustomerCriteriaInput } from '../../dtos/customer/customer-criteria.input';
import { CustomerCriteria } from '../../../domain/criterias/customer/customer.criteria';
import { CustomerCriteriaBuilder } from '../../../domain/criterias/customer/customer.criteria.builder';
import { CustomerInput } from '../../dtos/customer/customer.input';

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
   * @description Maps a Customer to a OrderCustomerDto
   * @param {Customer} customer - The Customer to map
   * @returns {OrderCustomerDto} - The mapped OrderCustomerDto
   */
  public static mapToDto(customer: Customer): OrderCustomerDto {
    const customerDto = new OrderCustomerDtoBuilder()
      .setId(customer?._id?.toString())
      .setCreatedAt(customer?.createdAt)
      .setUpdatedAt(customer?.updatedAt)
      .setCode(customer?.code)
      .setName(customer?.name)
      .setDeliveryAddress(
        customer.deliveryAddress &&
          AddressMapper.mapToDto(customer?.deliveryAddress),
      )
      .setInvoiceAddress(
        customer.invoiceAddress &&
          AddressMapper.mapToDto(customer?.invoiceAddress),
      )
      .build();
    return customerDto;
  }

  /**
   * @method mapToEntity
   * @description Maps a OrderCustomerDto to a Customer
   * @param {OrderCustomerDto | CustomerInput} customerDto - The OrderCustomerDto or the CustomerInput to map
   * @returns {Customer} - The mapped Customer
   */
  public static mapToEntity(
    customerDto: OrderCustomerDto | Partial<CustomerInput>,
  ): Customer {
    const customer = new Customer.Builder()
      .setId(customerDto?.id)
      .setCode(customerDto?.code)
      .setName(customerDto?.name)
      .setDeliveryAddress(
        AddressMapper.mapToEntity(customerDto?.deliveryAddress),
      )
      .setInvoiceAddress(AddressMapper.mapToEntity(customerDto?.invoiceAddress))
      .build();

    return customer;
  }
}
