import { InputType, PickType } from '@nestjs/graphql';
import { SettingInput } from '../setting.input';

@InputType()
export class UpdateSettingMutation extends PickType(SettingInput, [
  'id',
  'code',
  'properties',
]) {}
