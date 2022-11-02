import { Field, InputType, PartialType } from '@nestjs/graphql';
import { SettingCreateInput } from './setting-create.input';

@InputType()
export class SettingUpdateInput extends PartialType(SettingCreateInput) {
  @Field(() => String, { name: 'id' })
  private readonly _id: string;

  public get id(): string {
    return this._id;
  }
}
