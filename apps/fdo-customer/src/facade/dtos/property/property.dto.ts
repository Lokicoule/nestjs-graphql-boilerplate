import { DtoModel } from '@lib/fdo-graphql';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  PropertyKeyEnum,
  PropertyKeyEnumProvider,
} from '../../../domain/enums/property/property.enum';
import { PropertyDtoBuilder } from './property.dto.builder';

registerEnumType(PropertyKeyEnumProvider.useValue, {
  name: PropertyKeyEnumProvider.provide,
});

@ObjectType()
export class PropertyDto extends DtoModel {
  @Field(() => PropertyKeyEnum, { name: 'key' })
  private _key: PropertyKeyEnum;

  @Field(() => String, { name: 'value' })
  private _value: string;

  constructor(builder: PropertyDtoBuilder) {
    super(builder);
    this._key = builder.key;
    this._value = builder.value;
  }

  public get key(): PropertyKeyEnum {
    return this._key;
  }

  public get value(): string {
    return this._value;
  }
}
