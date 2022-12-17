import { IProperty, Property } from '../../domain/entities/property.entity';
import { PropertyEnum } from '../../domain/enums/property.enum';
import { PropertyInput } from '../dtos/inputs/property.input';
import { IPropertyDto, PropertyDto } from '../dtos/property.dto';

export class PropertyMapper {
  public static toEntity(data: PropertyInput): Property {
    return new Property({
      _id: data.id,
      key: data.key,
      value: data.value,
    });
  }

  public static toEntityArray(data: PropertyInput[]): Property[] {
    return data?.map((input) => this.toEntity(input));
  }

  public static toDto(data: IProperty): PropertyDto {
    return new PropertyDto({
      id: data?._id.toString(),
      key: PropertyEnum.getValue(data.key),
      value: data.value,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
    });
  }

  public static toDtoArray(data: IProperty[]): PropertyDto[] {
    return data?.map((entity) => this.toDto(entity));
  }
}
