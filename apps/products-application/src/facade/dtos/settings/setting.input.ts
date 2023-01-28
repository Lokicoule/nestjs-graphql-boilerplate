import { BaseInput, IBaseInput } from '@lib/fdo-graphql';
import { Field, InputType } from '@nestjs/graphql';
import { ArrayUnique } from 'class-validator';
import { SettingCodeEnum } from '~/domain';
import { PropertyInput } from './property.input';

export interface ISettingInput extends IBaseInput {
  code: SettingCodeEnum;
  properties: PropertyInput[];
}

@InputType()
export class SettingInput extends BaseInput implements ISettingInput {
  @Field(() => SettingCodeEnum, { name: 'code' })
  public readonly code: SettingCodeEnum;

  @Field(() => [PropertyInput], { name: 'properties' })
  @ArrayUnique((o) => o.key)
  public readonly properties: PropertyInput[];

  constructor(data: ISettingInput) {
    super(data);
    this.code = data?.code;
    this.properties = data?.properties;
  }
}
