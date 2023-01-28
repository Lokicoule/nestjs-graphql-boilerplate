import { BaseInput, IBaseInput } from '@lib/fdo-graphql';
import { Field, InputType } from '@nestjs/graphql';
import { PropertyKeyEnum } from '~/domain';

export interface IPropertyInput extends IBaseInput {
  key: PropertyKeyEnum;
  value: string;
}

@InputType()
export class PropertyInput extends BaseInput implements IPropertyInput {
  @Field(() => PropertyKeyEnum, { name: 'key' })
  public readonly key: PropertyKeyEnum;

  @Field(() => String, { name: 'value' })
  public readonly value: string;

  constructor(data: IPropertyInput) {
    super(data);
    this.key = data.key;
    this.value = data.value;
  }
}
