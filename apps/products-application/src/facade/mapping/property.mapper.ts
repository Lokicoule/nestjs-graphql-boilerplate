import { ArrayMapper } from '@lib/fdo-utils';
import { Injectable } from '@nestjs/common';
import { Property, PropertyEnum } from '~/domain';
import { PropertyOutput, PropertyInput } from '../dtos';

@Injectable()
export class PropertyMapper extends ArrayMapper<
  PropertyOutput,
  PropertyInput,
  Property
> {
  public toDto(entity: Property): PropertyOutput {
    return new PropertyOutput({
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
