import { DtoModel, IDtoModel } from '@lib/fdo-graphql';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  PropertyEnum,
  PropertyKeyEnum,
} from '../../domain/enums/property.enum';

registerEnumType(PropertyKeyEnum, {
  name: PropertyEnum.provider,
});

export interface IPropertyDto extends IDtoModel {
  key: PropertyKeyEnum;
  value: string;
}

@ObjectType()
export class PropertyDto extends DtoModel {
  @Field(() => PropertyKeyEnum, { name: 'key' })
  public readonly key: PropertyKeyEnum;

  @Field(() => String, { name: 'value' })
  public readonly value: string;

  constructor(data: IPropertyDto) {
    super(data);
    this.key = data.key;
    this.value = data.value;
  }
}
