import { Field, InputType, ID } from '@nestjs/graphql';
import { CreateAddressInput } from '../../address/inputs/create-address.input';

@InputType()
export class CreateCustomerAddressInput {
  @Field(() => ID, { name: 'id' })
  private readonly _id: string;

  @Field(() => CreateAddressInput, { name: 'address' })
  private readonly _address: CreateAddressInput;

  constructor(id: string, address: CreateAddressInput) {
    this._id = id;
    this._address = address;
  }

  public get id(): string {
    return this._id;
  }

  public get address(): CreateAddressInput {
    return this._address;
  }
}
