import { ArrayMapper } from '@lib/fdo-utils';
import { Injectable } from '@nestjs/common';
import { Property, PropertyEnum } from '~/domain';
import { PropertyDto, PropertyInput } from '../dtos';

@Injectable()
export class PropertyMapper extends ArrayMapper<
  PropertyDto,
  PropertyInput,
  Property
> {
  public toDto(entity: Property): PropertyDto {
    return new PropertyDto({
      id: entity?._id.toString(),
      key: PropertyEnum.getValue(entity.key),
      value: entity.value,
      createdAt: entity?.createdAt,
      updatedAt: entity?.updatedAt,
    });
  }

  public toEntity(dto: PropertyInput): Property {
    return new Property({
      _id: dto.id,
      key: dto.key,
      value: dto.value,
    });
  }
}
