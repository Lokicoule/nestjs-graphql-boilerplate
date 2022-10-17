import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAddressInput {
  @Field(() => String, { name: 'street', nullable: true })
  private readonly _street?: string;

  @Field(() => String, { name: 'city' })
  private readonly _city: string;

  @Field(() => String, { name: 'state' })
  private readonly _state: string;

  @Field(() => String, { name: 'zip' })
  private readonly _zip: string;

  @Field(() => String, { name: 'country' })
  private readonly _country: string;

  constructor(
    country: string,
    city: string,
    state: string,
    zip: string,
    street?: string,
  ) {
    this._city = city;
    this._state = state;
    this._zip = zip;
    this._country = country;
    this._street = street;
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

  public get zip(): string {
    return this._zip;
  }

  public get country(): string {
    return this._country;
  }
}
