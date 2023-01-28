import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { ProductOutput } from '../products';
import { SettingOutput } from '../settings';

interface IUserOutput {
  id: string;
  products?: ProductOutput[];
  settings?: SettingOutput[];
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class UserOutput implements IUserOutput {
  @Field((type) => ID)
  @Directive('@external')
  public readonly id: string;

  @Field((type) => [ProductOutput])
  public readonly products?: ProductOutput[];

  @Field((type) => [SettingOutput])
  public readonly settings?: SettingOutput[];

  constructor(partial: Partial<IUserOutput>) {
    Object.assign(this, partial);
  }
}
