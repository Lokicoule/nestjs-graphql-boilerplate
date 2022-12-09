import { DtoModel } from '@lib/fdo-graphql';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  OrderLifeCycleEnum,
  OrderLifeCycleEnumProvider,
} from '../../../domain/enums/order/order.enum';
import { OrderCustomerDto } from '../customer/customer.dto';
import { OrderItemDto } from '../order-item/order-item.dto';
import { OrderDtoBuilder } from './order.dto.builder';

registerEnumType(OrderLifeCycleEnumProvider.useValue, {
  name: OrderLifeCycleEnumProvider.provide,
});

@ObjectType()
export class OrderDto extends DtoModel {
  @Field(() => String, { name: 'code' })
  private _code: string;

  @Field(() => Date, { name: 'billingDate' })
  private _billingDate: Date;

  @Field(() => Date, {
    name: 'dueDate',
  })
  private _dueDate: Date;

  @Field(() => OrderCustomerDto, { name: 'customer' })
  private _customer: OrderCustomerDto;

  @Field(() => [OrderItemDto], { name: 'items' })
  private _items: OrderItemDto[];

  @Field(() => OrderLifeCycleEnum, { name: 'lifeCycle' })
  private _lifeCycle: OrderLifeCycleEnum;

  constructor(builder: OrderDtoBuilder) {
    super(builder);
    this._code = builder.code;
    this._billingDate = builder.billingDate;
    this._dueDate = builder.dueDate;
    this._customer = builder.customer;
    this._items = builder.items;
    this._lifeCycle = builder.lifeCycle;
  }

  public get code(): string {
    return this._code;
  }

  public get billingDate(): Date {
    return this._billingDate;
  }

  public get dueDate(): Date {
    return this._dueDate;
  }

  public get customer(): OrderCustomerDto {
    return this._customer;
  }

  public get items(): OrderItemDto[] {
    return this._items;
  }

  public get lifeCycle(): OrderLifeCycleEnum {
    return this._lifeCycle;
  }
}
