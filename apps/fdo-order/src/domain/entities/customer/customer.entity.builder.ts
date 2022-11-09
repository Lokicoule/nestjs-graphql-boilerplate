import { EntityBuilder } from '@lib/fdo-database/mongodb/entity/entity.builder';
import { Address } from '../address/address.entity';
import { Customer } from './customer.entity';

/**
 * @class CustomerBuilder
 * @description CustomerBuilder class is used to build Customer objects.
 * @extends EntityBuilder
 * @property {string} code - The customer code.
 * @property {string} name - The customer name.
 * @property {Address[]} addresses - The customer addresses.
 */
export class CustomerBuilder extends EntityBuilder {
  private _code: string;
  private _name: string;
  private _deliveryAddress: Address;
  private _invoiceAddress: Address;

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

  public get deliveryAddress(): Address {
    return this._deliveryAddress;
  }

  public setDeliveryAddress(value: Address) {
    this._deliveryAddress = value;
    return this;
  }

  public get invoiceAddress(): Address {
    return this._invoiceAddress;
  }

  public setInvoiceAddress(value: Address) {
    this._invoiceAddress = value;
    return this;
  }

  public build(): Customer {
    return new Customer(this);
  }

  public copy(customer: Customer): CustomerBuilder {
    super.copy(customer);
    this._code = customer.code;
    this._name = customer.name;
    this._deliveryAddress = customer.deliveryAddress;
    this._invoiceAddress = customer.invoiceAddress;
    return this;
  }
}
