import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateCustomerAddressInput } from './create-customer-address.input';
import { UpdateAddressInput } from './update-address.input';

@InputType()
export class UpdateCustomerAddressInput extends PartialType(
  OmitType(CreateCustomerAddressInput, ['address']),
) {
  @Field(() => UpdateAddressInput, { name: 'address' })
  private readonly _address: UpdateAddressInput;

  constructor(address: UpdateAddressInput) {
    super(address);
    this._address = address;
  }

  public get address(): UpdateAddressInput {
    return this._address;
  }
}
