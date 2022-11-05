import { ProductCriteriaBuilder } from './product.criteria.builder';

export class ProductCriteria {
  public readonly _id?: string;
  public readonly code?: string;
  public readonly label?: string;

  constructor(builder: ProductCriteriaBuilder) {
    if (Boolean(builder.id)) {
      this._id = builder.id;
    }
    if (Boolean(builder.code)) {
      this.code = builder.code;
    }
    if (Boolean(builder.label)) {
      this.label = builder.label;
    }
  }
}
