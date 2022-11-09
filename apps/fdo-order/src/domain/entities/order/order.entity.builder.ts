import { EntityBuilder } from '@lib/fdo-database/mongodb/entity/entity.builder';
import { Customer } from '../customer/customer.entity';
import { OrderItem } from '../order-item/order-item.entity';
import { Order } from './order.entity';

export class OrderBuilder extends EntityBuilder {
  private _code: string;
  private _billingDate: Date;
  private _dueDate: Date;
  private _customer: Customer;
  private _items: OrderItem[];
  private _lifeCycle: string;

  public get code(): string {
    return this._code;
  }

  public setCode(value: string) {
    this._code = value;
    return this;
  }

  public get billingDate(): Date {
    return this._billingDate;
  }

  public setBillingDate(value: Date) {
    this._billingDate = value;
    return this;
  }

  public get dueDate(): Date {
    return this._dueDate;
  }

  public setDueDate(value: Date) {
    this._dueDate = value;
    return this;
  }

  public get customer(): Customer {
    return this._customer;
  }

  public setCustomer(value: Customer) {
    this._customer = value;
    return this;
  }

  public get items(): OrderItem[] {
    return this._items;
  }

  public setItems(value: OrderItem[]) {
    this._items = value;
    return this;
  }

  public get lifeCycle(): string {
    return this._lifeCycle;
  }

  public setLifeCycle(value: string) {
    this._lifeCycle = value;
    return this;
  }

  public build(): Order {
    return new Order(this);
  }

  public copy(order: Order): OrderBuilder {
    super.copy(order);
    this._code = order.code;
    this._billingDate = order.billingDate;
    this._dueDate = order.dueDate;
    this._customer = order.customer;
    this._items = order.items;
    this._lifeCycle = order.lifeCycle;
    return this;
  }
}
