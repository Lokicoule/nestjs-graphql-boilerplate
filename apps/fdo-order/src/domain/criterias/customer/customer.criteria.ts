import { CustomerCriteriaBuilder } from './customer.criteria.builder';

export class CustomerCriteria {
  public readonly _id?: string;
  public readonly code?: string;
  public readonly name?: string;

  constructor(builder: CustomerCriteriaBuilder) {
    this._id = builder.id;
    this.code = builder.code;
    this.name = builder.name;
  }
}
