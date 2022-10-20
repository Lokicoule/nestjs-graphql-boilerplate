import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddressInput {
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
