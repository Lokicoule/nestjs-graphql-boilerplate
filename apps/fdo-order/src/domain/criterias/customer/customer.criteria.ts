import { CustomerCriteriaBuilder } from './customer.criteria.builder';

export class CustomerCriteria {
  public readonly _id?: string;
  public readonly code?: string;
  public readonly name?: string;

  constructor(builder: CustomerCriteriaBuilder) {
    if (Boolean(builder.id)) {
      this._id = builder.id;
    }
    if (Boolean(builder.code)) {
      this.code = builder.code;
    }
    if (Boolean(builder.name)) {
      this.name = builder.name;
    }
  }
}
