import { ArrayMapper } from '@lib/fdo-utils';
import { Property } from '../../domain/entities/property.entity';
import { PropertyEnum } from '../../domain/enums/property.enum';
import { PropertyInput } from '../dtos/inputs/property.input';
import { PropertyDto } from '../dtos/property.dto';
import { Injectable } from '@nestjs/common';

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
