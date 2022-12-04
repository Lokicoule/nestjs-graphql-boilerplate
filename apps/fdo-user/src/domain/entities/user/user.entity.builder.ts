import { EntityBuilder } from '@lib/fdo-database/mongodb/entity/entity.builder';
import { Address } from '../address/address.entity';
import { Company } from '../company/company.entity';
import { User } from './user.entity';

export class UserBuilder extends EntityBuilder {
  private _cognitoId: string;

  private _firstName: string;

  private _lastName: string;

  private _email: string;

  private _phone: string;

  private _address: Address;

  private _company: Company;

  public get cognitoId(): string {
    return this._cognitoId;
  }

  public setCognitoId(value: string) {
    this._cognitoId = value;
    return this;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public setFirstName(value: string) {
    this._firstName = value;
    return this;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public setLastName(value: string) {
    this._lastName = value;
    return this;
  }

  public get email(): string {
    return this._email;
  }

  public setEmail(value: string) {
    this._email = value;
    return this;
  }

  public get phone(): string {
    return this._phone;
  }

  public setPhone(value: string) {
    this._phone = value;
    return this;
  }

  public get address(): Address {
    return this._address;
  }

  public setAddress(value: Address) {
    this._address = value;
    return this;
  }

  public get company(): Company {
    return this._company;
  }

  public setCompany(value: Company) {
    this._company = value;
    return this;
  }

  public build(): User {
    return new User(this);
  }

  public copy(user: User): UserBuilder {
    super.copy(user);
    this._firstName = user.firstName;
    this._lastName = user.lastName;
    this._email = user.email;
    this._phone = user.phone;
    this._address = user.address;
    this._company = user.company;
    return this;
  }
}
