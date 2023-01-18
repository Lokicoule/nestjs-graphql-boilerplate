import { InputType, OmitType } from '@nestjs/graphql';
import { SettingInput } from './setting.input';

@InputType()
export class SettingCreateInput extends OmitType(SettingInput, ['id']) {}
