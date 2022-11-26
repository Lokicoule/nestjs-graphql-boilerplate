import { DtoBuilder } from '@lib/fdo-graphql/dto/dto.builder';
import { AddressDto } from '../address/address.dto';
import { CompanyDto } from '../company/company.dto';
import { UserDto } from './user.dto';

export class UserDtoBuilder extends DtoBuilder {
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _phone: string;
  private _address: AddressDto;
  private _company: CompanyDto;

  public get firstName(): string {
    return this._firstName;
  }

  public setFirstName(firstName: string): UserDtoBuilder {
    this._firstName = firstName;
    return this;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public setLastName(lastName: string): UserDtoBuilder {
    this._lastName = lastName;
    return this;
  }

  public get email(): string {
    return this._email;
  }

  public setEmail(email: string): UserDtoBuilder {
    this._email = email;
    return this;
  }

  public get phone(): string {
    return this._phone;
  }

  public setPhone(phone: string): UserDtoBuilder {
    this._phone = phone;
    return this;
  }

  public get address(): AddressDto {
    return this._address;
  }

  public setAddress(address: AddressDto): UserDtoBuilder {
    this._address = address;
    return this;
  }

  public get company(): CompanyDto {
    return this._company;
  }

  public setCompany(company: CompanyDto): UserDtoBuilder {
    this._company = company;
    return this;
  }

  build(): UserDto {
    return new UserDto(this);
  }
}
