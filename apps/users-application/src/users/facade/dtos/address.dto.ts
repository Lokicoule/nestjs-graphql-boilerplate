import { DtoModel, IDtoModel } from '@lib/fdo-graphql';
import { Field, ObjectType } from '@nestjs/graphql';

interface IAddressDto extends IDtoModel {
  address: string;
  additionalAddress?: string;
  city: string;
  country: string;
  zipCode: string;
}

/**
 * @class AddressDto
 * @description Data Transfer Object for Address
 * @see AddressDtoBuilder
 * @see DtoModel
 */
@ObjectType()
export class AddressDto extends DtoModel implements IAddressDto {
  @Field(() => String, { name: 'address' })
  public address: string;

  @Field(() => String, { name: 'additionalAddress', nullable: true })
  public additionalAddress: string;

  @Field(() => String, { name: 'city' })
  public city: string;

  @Field(() => String, { name: 'country' })
  public country: string;

  @Field(() => String, { name: 'zipCode' })
  public zipCode: string;

  constructor(address: IAddressDto) {
    super(address);
    this.address = address.address;
    this.additionalAddress = address.additionalAddress;
    this.city = address.city;
    this.country = address.country;
    this.zipCode = address.zipCode;
  }
}
