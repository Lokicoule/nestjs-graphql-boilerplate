import { Field, InputType, PickType } from '@nestjs/graphql';
import { Equals } from 'class-validator';
import { SettingCodeEnum } from '~/domain';
import { CustomerCodeSettingValidator } from '../../../validators';
import { PropertyInput, SettingInput } from '../../settings';

@InputType()
export class CustomerCodeSettingInput extends PickType(SettingInput, ['id']) {
  @Field(() => SettingCodeEnum, { name: 'code' })
  @Equals(SettingCodeEnum.CODE_GENERATOR, {
    message: `Only code: '${SettingCodeEnum.CODE_GENERATOR}' is accepted`,
  })
  public readonly code: SettingCodeEnum;

  @Field(() => [PropertyInput], { name: 'properties' })
  @CustomerCodeSettingValidator()
  public readonly properties: PropertyInput[];
}
