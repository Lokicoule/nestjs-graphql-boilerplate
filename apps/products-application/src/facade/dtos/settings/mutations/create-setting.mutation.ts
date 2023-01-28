import { InputType, OmitType } from '@nestjs/graphql';
import { SettingInput } from '../setting.input';

@InputType()
export class CreateSettingMutation extends OmitType(SettingInput, ['id']) {}
