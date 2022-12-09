import { DtoModel } from '@lib/fdo-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { AddressDtoBuilder } from './address.dto.builder';

/**
 * @class AddressDto
 * @description Data Transfer Object for Address
 * @see AddressDtoBuilder
 * @see DtoModel
 */
@ObjectType()
export class AddressDto extends DtoModel {
  @Field(() => String, { name: 'address' })
  private _address: string;

  @Field(() => String, { name: 'additionalAddress', nullable: true })
  private _additionalAddress: string;

  @Field(() => String, { name: 'city' })
  private _city: string;

  @Field(() => String, { name: 'country' })
  private _country: string;

  @Field(() => String, { name: 'zipCode' })
  private _zipCode: string;

  constructor(builder: AddressDtoBuilder) {
    super(builder);
    this._address = builder.address;
    this._city = builder.city;
    this._additionalAddress = builder.additionalAddress;
    this._zipCode = builder.zipCode;
    this._country = builder.country;
  }

  public get address(): string {
    return this._address;
  }

  public get additionalAddress(): string {
    return this._additionalAddress;
  }

  public get city(): string {
    return this._city;
  }

  public get country(): string {
    return this._country;
  }

  public get zipCode(): string {
    return this._zipCode;
  }
}
