import { BaseInput, IBaseInput } from '@lib/fdo-graphql';
import { Field, InputType } from '@nestjs/graphql';
import { PropertyKeyEnum } from '~/domain';

export interface IPropertyInput extends IBaseInput {
  key: PropertyKeyEnum;
  value: string;
}

@InputType()
export class PropertyInput implements IPropertyInput {
  @Field(() => String, { name: 'id', nullable: true })
  public readonly id: string;

  @Field(() => PropertyKeyEnum, { name: 'key' })
  public readonly key: PropertyKeyEnum;

  @Field(() => String, { name: 'value' })
  public readonly value: string;

  constructor(data: IPropertyInput) {
    this.id = data?.id;
    this.key = data?.key;
    this.value = data?.value;
  }
}
