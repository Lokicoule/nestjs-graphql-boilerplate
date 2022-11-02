import { Field, InputType } from '@nestjs/graphql';
import { SettingCodeEnum } from 'apps/fdo-customer/src/domain/enums/setting/setting.enum';

@InputType()
export class SettingCriteriaInput {
  @Field(() => String, { name: 'id', nullable: true })
  private readonly _id: string;

  @Field(() => SettingCodeEnum, { name: 'code', nullable: true })
  private readonly _code: SettingCodeEnum;

  public get id(): string {
    return this._id;
  }

  public get code(): SettingCodeEnum {
    return this._code;
  }
}
