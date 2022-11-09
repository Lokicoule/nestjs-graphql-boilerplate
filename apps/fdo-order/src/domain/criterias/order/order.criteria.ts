import { CustomerCriteria } from '../customer/customer.criteria';
import { OrderCriteriaBuilder } from './order.criteria.builder';

export class OrderCriteria {
  public readonly _id?: string;
  public readonly code?: string;
  public readonly customer?: CustomerCriteria;
  public readonly lifeCycle?: string;

  constructor(builder: OrderCriteriaBuilder) {
    this._id = builder.id;
    this.code = builder.code;
    this.customer = builder.customer;
    this.lifeCycle = builder.lifeCycle;
  }
}
