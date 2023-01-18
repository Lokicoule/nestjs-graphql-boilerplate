import { Field, InputType } from '@nestjs/graphql';
import { ArrayUnique } from 'class-validator';
import { SettingCodeEnum } from '~/domain/enums/setting.enum';
import { PropertyInput } from './property.input';

@InputType()
export class SettingInput {
  @Field(() => String, { name: 'id' })
  public readonly id: string;

  @Field(() => SettingCodeEnum, { name: 'code' })
  public readonly code: SettingCodeEnum;

  @Field(() => [PropertyInput], { name: 'properties' })
  @ArrayUnique((o) => o.key)
  public readonly properties: PropertyInput[];
}
