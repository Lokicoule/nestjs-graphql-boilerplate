import { EntityBuilder } from '@lib/fdo-database/mongodb/entity/entity.builder';
import { Address } from './address.entity';

export class AddressBuilder extends EntityBuilder {
  private _address: string;
  private _city: string;
  private _additionalAddress: string;
  private _zipCode: string;
  private _country: string;

  public get address(): string {
    return this._address;
  }

  public setAddress(value: string) {
    this._address = value;
    return this;
  }

  public get city(): string {
    return this._city;
  }

  public setCity(value: string) {
    this._city = value;
    return this;
  }

  public get additionalAddress(): string {
    return this._additionalAddress;
  }

  public setAdditionalAddress(value: string) {
    this._additionalAddress = value;
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

  public build(): Address {
    return new Address(this);
  }
}
