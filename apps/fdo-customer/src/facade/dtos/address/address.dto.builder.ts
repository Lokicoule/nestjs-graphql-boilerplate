import { DtoBuilder } from '@lib/fdo-graphql/dto/dto.builder';
import { AddressDto } from './address.dto';

export class AddressDtoBuilder extends DtoBuilder {
  private _street: string;
  private _city: string;
  private _state: string;
  private _zipCode: string;
  private _country: string;

  public get street(): string {
    return this._street;
  }

  public setStreet(value: string) {
    this._street = value;
    return this;
  }

  public get city(): string {
    return this._city;
  }

  public setCity(value: string) {
    this._city = value;
    return this;
  }

  public get state(): string {
    return this._state;
  }

  public setState(value: string) {
    this._state = value;
    return this;
  }

  public get zipCode(): string {
    return this._zipCode;
  }

  public setZipCode(value: string) {
    this._zipCode = value;
    return this;
  }

  public get country(): string {
    return this._country;
  }

  public setCountry(value: string) {
    this._country = value;
    return this;
  }

  build(): AddressDto {
    return new AddressDto(this);
  }
}
