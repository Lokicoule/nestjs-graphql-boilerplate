import { ArrayMapperWithCriteria } from '@lib/fdo-utils';
import { Injectable } from '@nestjs/common';
import { Customer, CustomerCriteria } from '~/domain';
import { CustomerCriteriaInput, CustomerDto, CustomerInput } from '../dtos';

@Injectable()
export class CustomerMapper extends ArrayMapperWithCriteria<
  CustomerDto,
  Partial<CustomerInput> & Pick<Customer, 'authorId'>,
  Customer,
  CustomerCriteriaInput & Pick<CustomerCriteria, 'authorId'>,
  CustomerCriteria
> {
  public toCriteria(
    dto: CustomerCriteriaInput & Pick<CustomerCriteria, 'authorId'>,
  ): CustomerCriteria {
    return new CustomerCriteria({
      id: dto?.id,
      code: dto?.code,
      label: dto?.label,
      authorId: dto?.authorId,
    });
  }

  public toDto(entity: Customer): CustomerDto {
    return new CustomerDto({
      id: entity?._id.toString(),
      authorId: entity?.authorId,
      code: entity.code,
      label: entity.label,
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
      label: dto.label,
    });
  }
}
