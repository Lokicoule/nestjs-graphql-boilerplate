import { BaseOutput, IBaseOutput } from '@lib/fdo-graphql';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PropertyEnum, PropertyKeyEnum } from '~/domain';

registerEnumType(PropertyKeyEnum, {
  name: PropertyEnum.provider,
});

export interface IPropertyOutput extends IBaseOutput {
  key: PropertyKeyEnum;
  value: string;
}

@ObjectType()
export class PropertyOutput extends BaseOutput implements IPropertyOutput {
  @Field(() => PropertyKeyEnum, { name: 'key' })
  public readonly key: PropertyKeyEnum;

  @Field(() => String, { name: 'value' })
  public readonly value: string;

  constructor(data: IPropertyOutput) {
    super(data);
    this.key = data?.key;
    this.value = data?.value;
  }
}
