import { Field, InputType, PickType } from '@nestjs/graphql';
import { SettingCodeEnum } from 'apps/fdo-customer/src/domain/enums/setting/setting.enum';
import { Equals } from 'class-validator';
import { CodeGeneratorPropertiesValidator } from '../../../../validators/code-generator.validator';
import { PropertyInput } from '../../../property/property.input';
import { SettingInput } from '../setting.input';

@InputType()
export class SettingCodeGeneratorInput extends PickType(SettingInput, ['id']) {
  @Field(() => SettingCodeEnum, { name: 'code' })
  @Equals(SettingCodeEnum.CODE_GENERATOR, {
    message: `Only code: '${SettingCodeEnum.CODE_GENERATOR}' is accepted`,
  })
  public readonly code: SettingCodeEnum;

  @Field(() => [PropertyInput], { name: 'properties' })
  @CodeGeneratorPropertiesValidator()
  public readonly properties: PropertyInput[];
}
