import { DtoBuilder } from '@lib/fdo-graphql/dto/dto.builder';
import {
  OrderLifeCycleEnum,
  OrderLifeCycleEnumProvider,
} from '../../../domain/enums/order/order.enum';
import { OrderCustomerDto } from '../customer/customer.dto';
import { OrderItemDto } from '../order-item/order-item.dto';
import { OrderDto } from './order.dto';

export class OrderDtoBuilder extends DtoBuilder {
  private _code: string;
  private _billingDate: Date;
  private _dueDate: Date;
  private _customer: OrderCustomerDto;
  private _items: OrderItemDto[];
  private _lifeCycle: OrderLifeCycleEnum;

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

  public get customer(): OrderCustomerDto {
    return this._customer;
  }

  public setCustomer(value: OrderCustomerDto) {
    this._customer = value;
    return this;
  }

  public get items(): OrderItemDto[] {
    return this._items;
  }

  public setItems(value: OrderItemDto[]) {
    this._items = value;
    return this;
  }

  public get lifeCycle(): OrderLifeCycleEnum {
    return this._lifeCycle;
  }

  public setLifeCycle(value: string | OrderLifeCycleEnum) {
    this._lifeCycle =
      typeof value === 'string'
        ? OrderLifeCycleEnumProvider.useFactory(value)
        : value;
    return this;
  }

  build(): OrderDto {
    return new OrderDto(this);
  }
}
