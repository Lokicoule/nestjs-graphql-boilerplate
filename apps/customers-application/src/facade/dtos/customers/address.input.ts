import { BaseInput, IBaseInput } from '@lib/fdo-graphql';
import { Field, InputType } from '@nestjs/graphql';
import { IsPhoneNumber, IsPostalCode } from 'class-validator';

export interface IAddressInput extends IBaseInput {
  name: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  zipCode: string;
}

/**
 * @class AddressInput
 * @description Input Type for Address
 * @see AddressOutput
 */
@InputType()
export class AddressInput extends BaseInput implements IAddressInput {
  @Field(() => String, { name: 'name' })
  public readonly name: string;

  @Field(() => String, { name: 'phoneNumber' })
  @IsPhoneNumber()
  public readonly phoneNumber: string;

  @Field(() => String, { name: 'addressLine1' })
  public readonly addressLine1: string;

  @Field(() => String, { name: 'addressLine2', nullable: true })
  public readonly addressLine2: string;

  @Field(() => String, { name: 'city' })
  public readonly city: string;

  @Field(() => String, { name: 'country' })
  public readonly country: string;

  @Field(() => String, { name: 'zipCode' })
  @IsPostalCode()
  public readonly zipCode: string;

  constructor(data: IAddressInput) {
    super(data);
    this.name = data.name;
    this.phoneNumber = data.phoneNumber;
    this.addressLine1 = data.addressLine1;
    this.addressLine2 = data.addressLine2;
    this.city = data.city;
    this.country = data.country;
    this.zipCode = data.zipCode;
  }
}
