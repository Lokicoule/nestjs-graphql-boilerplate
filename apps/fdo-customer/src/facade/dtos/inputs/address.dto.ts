import { Dto, DtoProps } from '@lib/fdo-graphql';
import { Field, ObjectType } from '@nestjs/graphql';

type AddressDtoProps = {
  street?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
} & DtoProps;

@ObjectType()
export class AddressDto extends Dto {
  @Field(() => String, { name: 'street', nullable: true })
  private _street?: string;

  @Field(() => String, { name: 'city' })
  private _city: string;

  @Field(() => String, { name: 'state' })
  private _state: string;

  @Field(() => String, { name: 'zip' })
  private _zip: string;

  @Field(() => String, { name: 'country' })
  private _country: string;

  constructor(props: AddressDtoProps) {
    super(props);
    const { city, state, zip, country, street } = props;
    if (Boolean(street)) this._street = street;
    this._city = city;
    this._state = state;
    this._zip = zip;
    this._country = country;
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
