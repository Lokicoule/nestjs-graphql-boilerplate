import { Field, InputType } from '@nestjs/graphql';
import { SettingCodeEnum } from 'apps/fdo-customer/src/domain/enums/setting/setting.enum';
import { PropertyInput } from '../../property/property.input';

@InputType()
export class SettingCreateInput {
  @Field(() => SettingCodeEnum, { name: 'code' })
  private readonly _code: SettingCodeEnum;

  @Field(() => [PropertyInput], { name: 'properties' })
  private readonly _properties: PropertyInput[];

  public get code(): string {
    return this._code;
  }

  public get properties(): PropertyInput[] {
    return this._properties;
  }
}
