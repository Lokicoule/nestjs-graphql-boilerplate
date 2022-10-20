import { DtoModel } from '@lib/fdo-graphql';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AddressDtoBuilder } from './address.dto.builder';

@ObjectType()
export class AddressDto extends DtoModel {
  @Field(() => String, { name: 'street', nullable: true })
  private _street?: string;

  @Field(() => String, { name: 'city' })
  private _city: string;

  @Field(() => String, { name: 'state' })
  private _state: string;

  @Field(() => String, { name: 'zipCode' })
  private _zipCode: string;

  @Field(() => String, { name: 'country' })
  private _country: string;

  constructor(builder: AddressDtoBuilder) {
    super(builder);
    if (Boolean(builder)) {
      this._street = builder.street;
      this._city = builder.city;
      this._state = builder.state;
      this._zipCode = builder.zipCode;
      this._country = builder.country;
    }
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
}
