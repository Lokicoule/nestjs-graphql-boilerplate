import { DtoBuilder } from '@lib/fdo-graphql/dto/dto.builder';
import {
  PropertyKeyEnum,
  PropertyKeyEnumProvider,
} from '../../../domain/enums/property/property.enum';
import { PropertyDto } from './property.dto';

export class PropertyDtoBuilder extends DtoBuilder {
  private _key: PropertyKeyEnum;
  private _value: string;

  public get key(): PropertyKeyEnum {
    return this._key;
  }

  public setKey(value: string | PropertyKeyEnum) {
    this._key =
      typeof value === 'string'
        ? PropertyKeyEnumProvider.useFactory(value)
        : value;
    return this;
  }

  public get value(): string {
    return this._value;
  }

  public setValue(value: string) {
    this._value = value;
    return this;
  }

  public build(): PropertyDto {
    return new PropertyDto(this);
  }
}
