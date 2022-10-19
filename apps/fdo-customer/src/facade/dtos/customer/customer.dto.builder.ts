import { DtoBuilder } from '@lib/fdo-graphql/dto/dto.builder';
import { AddressDto } from '../address/address.dto';
import { CustomerDto } from './customer.dto';

export class CustomerDtoBuilder extends DtoBuilder {
  private _code: string;
  private _name: string;
  private _addresses: AddressDto[];

  public get code(): string {
    return this._code;
  }

  public setCode(value: string) {
    this._code = value;
    return this;
  }

  public get name(): string {
    return this._name;
  }

  public setName(value: string) {
    this._name = value;
    return this;
  }

  public get addresses(): AddressDto[] {
    return this._addresses;
  }

  public setAddresses(value: AddressDto[]) {
    this._addresses = value;
    return this;
  }

  build(): CustomerDto {
    return new CustomerDto(this);
  }
}
