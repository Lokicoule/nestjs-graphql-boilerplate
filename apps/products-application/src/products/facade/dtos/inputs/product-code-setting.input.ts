import { Field, InputType, PickType } from '@nestjs/graphql';
import { Equals } from 'class-validator';
import { SettingCodeEnum } from '../../../../settings/domain/enums/setting.enum';
import { ProductCodeSettingValidator } from '../../validators/product-code-setting.validator';
import { PropertyInput } from '../../../../settings/facade/dtos/inputs/property.input';
import { SettingInput } from '../../../../settings/facade/dtos/inputs/setting.input';

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
