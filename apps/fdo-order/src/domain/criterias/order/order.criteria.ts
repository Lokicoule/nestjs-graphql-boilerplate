import { CustomerCriteria } from '../customer/customer.criteria';
import { OrderCriteriaBuilder } from './order.criteria.builder';

export class OrderCriteria {
  public readonly _id?: string;
  public readonly code?: string;
  public readonly customer?: CustomerCriteria;
  public readonly lifeCycle?: string;

  constructor(builder: OrderCriteriaBuilder) {
    if (Boolean(builder.id)) {
      this._id = builder.id;
    }
    if (Boolean(builder.code)) {
      this.code = builder.code;
    }
    if (Boolean(builder.customer)) {
      this.customer = builder.customer;
    }
    if (Boolean(builder.lifeCycle)) {
      this.lifeCycle = builder.lifeCycle;
    }
  }
}
