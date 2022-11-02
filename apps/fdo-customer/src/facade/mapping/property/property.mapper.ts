import { Property } from '../../../domain/entities/property/property.entity';
import { PropertyDto } from '../../dtos/property/property.dto';
import { PropertyDtoBuilder } from '../../dtos/property/property.dto.builder';
import { PropertyInput } from '../../dtos/property/property.input';

export class PropertyMapper {
  public static mapToDto(entity: Property): PropertyDto {
    return new PropertyDtoBuilder()
      .setId(entity._id?.toString())
      .setKey(entity.key)
      .setValue(entity.value)
      .build();
  }

  public static mapToEntity(dto: PropertyDto | PropertyInput): Property {
    return new Property.Builder()
      .setId(dto?.id)
      .setKey(dto.key)
      .setValue(dto.value)
      .build();
  }
}
