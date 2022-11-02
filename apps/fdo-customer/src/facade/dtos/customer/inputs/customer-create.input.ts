import { Field, InputType } from '@nestjs/graphql';
import { AddressInput } from '../../address/address.input';

@InputType()
export class CustomerCreateInput {
  @Field(() => String, { name: 'code', nullable: true })
  private readonly _code: string;

  @Field(() => String, { name: 'name' })
  private readonly _name: string;

  @Field(() => [AddressInput], { name: 'addresses' })
  private readonly _addresses: AddressInput[];

  public get code(): string {
    return this._code;
  }

  public get name(): string {
    return this._name;
  }

  public get addresses(): AddressInput[] {
    return this._addresses;
  }
}
