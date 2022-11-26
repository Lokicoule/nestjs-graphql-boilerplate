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
  @Field(() => String, { name: 'street' })
  private _street: string;

  @Field(() => String, { name: 'city' })
  private _city: string;

  @Field(() => String, { name: 'state' })
  private _state: string;

  @Field(() => String, { name: 'zipCode' })
  private _zipCode: string;

  @Field(() => String, { name: 'country' })
  private _country: string;

  @Field(() => String, { name: 'number' })
  private _number: string;

  constructor(builder: AddressDtoBuilder) {
    super(builder);
    this._street = builder.street;
    this._city = builder.city;
    this._state = builder.state;
    this._zipCode = builder.zipCode;
    this._country = builder.country;
    this._number = builder.number;
  }

  public get street(): string {
    return this._street;
  }

  public get city(): string {
    return this._city;
  }

  public get state(): string {
    return this._state;
  }

  public get zipCode(): string {
    return this._zipCode;
  }

  public get country(): string {
    return this._country;
  }

  public get number(): string {
    return this._number;
  }
}
