import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { CustomerOutput } from '../customers';
import { SettingOutput } from '../settings';

interface IUserOutput {
  id: string;
  customers?: CustomerOutput[];
  settings?: SettingOutput[];
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class UserOutput implements IUserOutput {
  @Field((type) => ID)
  @Directive('@external')
  public readonly id: string;

  @Field((type) => [CustomerOutput])
  public readonly customers?: CustomerOutput[];

  @Field((type) => [SettingOutput])
  public readonly settings?: SettingOutput[];

  constructor(partial: Partial<IUserOutput>) {
    Object.assign(this, partial);
  }
}
