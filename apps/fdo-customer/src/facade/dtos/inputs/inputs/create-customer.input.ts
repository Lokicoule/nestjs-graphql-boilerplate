import { Field, InputType } from '@nestjs/graphql';
import { CreateAddressInput } from './create-address.input';

@InputType()
export class CreateCustomerInput {
  @Field(() => String, { nullable: true, name: 'code' })
  private readonly _code?: string;

  @Field(() => String, { name: 'name' })
  private readonly _name: string;

  @Field(() => CreateAddressInput, { name: 'address' })
  private readonly _address: CreateAddressInput;

  constructor(code: string, name: string, address: CreateAddressInput) {
    this._code = code;
    this._name = name;
    this._address = address;
  }

  public get code(): string {
    return this._code;
  }

  public get name(): string {
    return this._name;
  }

  public get address(): CreateAddressInput {
    return this._address;
  }
}
