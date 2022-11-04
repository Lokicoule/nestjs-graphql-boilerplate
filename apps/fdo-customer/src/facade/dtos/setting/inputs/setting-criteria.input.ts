import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { SettingInput } from './setting.input';

@InputType()
export class SettingCriteriaInput extends PartialType(
  PickType(SettingInput, ['id', 'code']),
) {}
