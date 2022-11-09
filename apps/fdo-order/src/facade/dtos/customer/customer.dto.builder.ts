import { DtoBuilder } from '@lib/fdo-graphql/dto/dto.builder';
import { AddressDto } from '../address/address.dto';
import { CustomerDto } from './customer.dto';

export class CustomerDtoBuilder extends DtoBuilder {
  private _code: string;
  private _name: string;
  private _deliveryAddress: AddressDto;
  private _invoiceAddress: AddressDto;

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

  public get deliveryAddress(): AddressDto {
    return this._deliveryAddress;
  }

  public setDeliveryAddress(value: AddressDto) {
    this._deliveryAddress = value;
    return this;
  }

  public get invoiceAddress(): AddressDto {
    return this._invoiceAddress;
  }

  public setInvoiceAddress(value: AddressDto) {
    this._invoiceAddress = value;
    return this;
  }

  build(): CustomerDto {
    return new CustomerDto(this);
  }
}
