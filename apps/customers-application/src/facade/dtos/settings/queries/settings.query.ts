import { Field, InputType } from '@nestjs/graphql';
import { SettingCodeEnum } from '~/domain';

@InputType()
export class SettingsQuery {
  @Field(() => String, { name: 'id' })
  public readonly id: string;

  @Field(() => SettingCodeEnum, { name: 'code' })
  public readonly code: SettingCodeEnum;
}
