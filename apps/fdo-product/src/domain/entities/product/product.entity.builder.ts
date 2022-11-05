import { EntityBuilder } from '@lib/fdo-database/mongodb/entity/entity.builder';
import { Product } from './product.entity';

export class ProductBuilder extends EntityBuilder {
  private _code: string;
  private _label: string;

  public get code(): string {
    return this._code;
  }

  public setCode(value: string) {
    this._code = value;
    return this;
  }

  public get label(): string {
    return this._label;
  }

  public setLabel(value: string) {
    this._label = value;
    return this;
  }

  public build(): Product {
    return new Product(this);
  }

  public copy(product: Product): ProductBuilder {
    super.copy(product);
    this._code = product.code;
    this._label = product.label;
    return this;
  }
}
