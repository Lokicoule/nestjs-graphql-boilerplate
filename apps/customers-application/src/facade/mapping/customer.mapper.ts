import { ArrayMapperWithCriteria } from '@lib/fdo-utils';
import { Injectable } from '@nestjs/common';
import { Customer, CustomerCriteria } from '~/domain';
import { CustomersQuery, CustomerOutput, CustomerInput } from '../dtos';
import { AddressMapper } from './address.mapper';

@Injectable()
export class CustomerMapper extends ArrayMapperWithCriteria<
  CustomerOutput,
  Partial<CustomerInput> & Pick<Customer, 'authorId'>,
  Customer,
  CustomersQuery & Pick<CustomerCriteria, 'authorId'>,
  CustomerCriteria
> {
  public toCriteria(
    dto: CustomersQuery & Pick<CustomerCriteria, 'authorId'>,
  ): CustomerCriteria {
    return new CustomerCriteria({
      id: dto?.id,
      code: dto?.code,
      name: dto?.name,
      authorId: dto?.authorId,
    });
  }

  public toDto(entity: Customer): CustomerOutput {
    return new CustomerOutput({
      id: entity?._id.toString(),
      authorId: entity?.authorId,
      code: entity.code,
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
      addresses: new AddressMapper().toDtoArray(entity.addresses),
      createdAt: entity?.createdAt,
      updatedAt: entity?.updatedAt,
    });
  }

  public toEntity(
    dto: Partial<CustomerInput> & Pick<Customer, 'authorId'>,
  ): Customer {
    return new Customer({
      _id: dto?.id,
      authorId: dto.authorId,
      code: dto?.code,
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      addresses: new AddressMapper().toEntityArray(dto.addresses),
    });
  }
}
