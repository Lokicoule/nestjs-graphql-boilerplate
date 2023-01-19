import { Field, InputType, PickType } from '@nestjs/graphql';
import { Equals } from 'class-validator';
import { SettingCodeEnum } from '~/domain';
import { ProductCodeSettingValidator } from '../../../validators';
import { PropertyInput, SettingInput } from '../../settings';

@InputType()
export class ProductCodeSettingInput extends PickType(SettingInput, ['id']) {
  @Field(() => SettingCodeEnum, { name: 'code' })
  @Equals(SettingCodeEnum.CODE_GENERATOR, {
    message: `Only code: '${SettingCodeEnum.CODE_GENERATOR}' is accepted`,
  })
  public readonly code: SettingCodeEnum;

  @Field(() => [PropertyInput], { name: 'properties' })
  @ProductCodeSettingValidator()
  public readonly properties: PropertyInput[];
}
