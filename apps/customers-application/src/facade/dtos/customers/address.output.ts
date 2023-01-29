import { BaseOutput, IBaseOutput } from '@lib/fdo-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsPhoneNumber, IsPostalCode } from 'class-validator';

interface IAddressOutput extends IBaseOutput {
  name: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  country: string;
  zipCode: string;
}

/**
 * @class AddressOutput
 * @description Data Transfer Object for Address
 * @see AddressOutputBuilder
 * @see DtoModel
 */
@ObjectType()
export class AddressOutput extends BaseOutput implements IAddressOutput {
  @Field(() => String, { name: 'name' })
  public name: string;

  @Field(() => String, { name: 'phoneNumber' })
  @IsPhoneNumber()
  public phoneNumber: string;

  @Field(() => String, { name: 'addressLine1' })
  public addressLine1: string;

  @Field(() => String, { name: 'addressLine2', nullable: true })
  public addressLine2: string;

  @Field(() => String, { name: 'city' })
  public city: string;

  @Field(() => String, { name: 'country' })
  public country: string;

  @Field(() => String, { name: 'zipCode' })
  @IsPostalCode()
  public zipCode: string;

  constructor(address: IAddressOutput) {
    super(address);
    this.name = address?.name;
    this.phoneNumber = address?.phoneNumber;
    this.addressLine1 = address?.addressLine1;
    this.addressLine2 = address?.addressLine2;
    this.city = address?.city;
    this.country = address?.country;
    this.zipCode = address?.zipCode;
  }
}
