import { EntityBuilder } from '@lib/fdo-database/mongodb/entity/entity.builder';
import { OrderItem } from './order-item.entity';
import { Product } from '../product/product.entity';

export class OrderItemBuilder extends EntityBuilder {
  private _product: Product;
  private _amount: number;
  private _unitPrice: number;
  private _batchNumber: string;
  private _containerNumber: string;
  private _bestBeforeDate: Date;

  public get product(): Product {
    return this._product;
  }

  public setProduct(value: Product) {
    this._product = value;
    return this;
  }

  public get amount(): number {
    return this._amount;
  }

  public setAmount(value: number) {
    this._amount = value;
    return this;
  }

  public get unitPrice(): number {
    return this._unitPrice;
  }

  public setUnitPrice(value: number) {
    this._unitPrice = value;
    return this;
  }

  public get batchNumber(): string {
    return this._batchNumber;
  }

  public setBatchNumber(value: string) {
    this._batchNumber = value;
    return this;
  }

  public get containerNumber(): string {
    return this._containerNumber;
  }

  public setContainerNumber(value: string) {
    this._containerNumber = value;
    return this;
  }

  public get bestBeforeDate(): Date {
    return this._bestBeforeDate;
  }

  public setBestBeforeDate(value: Date) {
    this._bestBeforeDate = value;
    return this;
  }

  public build(): OrderItem {
    return new OrderItem(this);
  }

  public copy(order: OrderItem): OrderItemBuilder {
    super.copy(order);
    this._product = order.product;
    this._amount = order.amount;
    this._unitPrice = order.unitPrice;
    this._batchNumber = order.batchNumber;
    this._containerNumber = order.containerNumber;
    this._bestBeforeDate = order.bestBeforeDate;
    return this;
  }
}
