import { EntityBuilder } from '@lib/fdo-database/mongodb/types/entity.builder';
import { Document, Types } from 'mongoose';
import { Observable } from 'rxjs';
import { Address } from './address.entity';
import { Customer, CustomerDocument } from './customer.entity';

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
  private _addresses: Address[];

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

  public get addresses(): Address[] {
    return this._addresses;
  }

  public setAddresses(value: Address[]) {
    this._addresses = value;
    return this;
  }

  public addAddress(address: Address) {
    if (Boolean(this._addresses)) {
      this._addresses.push(address);
    } else {
      this._addresses = [address];
    }
    return this;
  }

  public build(): Customer {
    return new Customer(this);
  }
}
