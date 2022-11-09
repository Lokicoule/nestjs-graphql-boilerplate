import { CriteriaBuilder } from '@lib/fdo-domain';
import { CustomerCriteria } from './customer.criteria';

export class CustomerCriteriaBuilder extends CriteriaBuilder<CustomerCriteria> {
  private _id: string;
  private _name: string;
  private _code: string;

  public withId(id: string): CustomerCriteriaBuilder {
    this._id = id;
    return this;
  }

  public withName(name: string): CustomerCriteriaBuilder {
    this._name = name;
    return this;
  }

  public withCode(code: string): CustomerCriteriaBuilder {
    this._code = code;
    return this;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get code(): string {
    return this._code;
  }

  /**
   * @override
   * @description Build a new instance of CustomerCriteria and remove all the properties that are undefined.
   * @returns {CustomerCriteria}
   */
  public build(): CustomerCriteria {
    return new CustomerCriteria(this);
  }
}
