import { CriteriaBuilder } from '@lib/fdo-domain';
import { CustomerCriteria } from '../customer/customer.criteria';
import { OrderCriteria } from './order.criteria';

export class OrderCriteriaBuilder extends CriteriaBuilder<OrderCriteria> {
  private _id: string;
  private _code: string;
  private _customer: CustomerCriteria;
  private _lifeCycle: string;

  public withId(id: string): OrderCriteriaBuilder {
    this._id = id;
    return this;
  }

  public withCode(code: string): OrderCriteriaBuilder {
    this._code = code;
    return this;
  }

  public withCustomer(customer: CustomerCriteria): OrderCriteriaBuilder {
    this._customer = customer;
    return this;
  }

  public withLifeCycle(lifeCycle: string): OrderCriteriaBuilder {
    this._lifeCycle = lifeCycle;
    return this;
  }

  public get id(): string {
    return this._id;
  }

  public get code(): string {
    return this._code;
  }

  public get customer(): CustomerCriteria {
    return this._customer;
  }

  public get lifeCycle(): string {
    return this._lifeCycle;
  }

  public build(): OrderCriteria {
    return new OrderCriteria(this);
  }
}
