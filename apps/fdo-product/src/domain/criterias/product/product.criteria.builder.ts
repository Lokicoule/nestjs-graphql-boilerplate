import { CriteriaBuilder } from '@lib/fdo-domain';
import { ProductCriteria } from './product.criteria';

export class ProductCriteriaBuilder extends CriteriaBuilder<ProductCriteria> {
  private _id: string;
  private _label: string;
  private _code: string;

  public withId(id: string): ProductCriteriaBuilder {
    this._id = id;
    return this;
  }

  public withLabel(label: string): ProductCriteriaBuilder {
    this._label = label;
    return this;
  }

  public withCode(code: string): ProductCriteriaBuilder {
    this._code = code;
    return this;
  }

  public get id(): string {
    return this._id;
  }

  public get label(): string {
    return this._label;
  }

  public get code(): string {
    return this._code;
  }

  public build(): ProductCriteria {
    return new ProductCriteria(this);
  }
}
