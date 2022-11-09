import { DateUtils } from '@lib/fdo-utils/date.utils';
import { Field, InputType } from '@nestjs/graphql';
import { OrderLifeCycleEnum } from 'apps/fdo-order/src/domain/enums/order/order.enum';
import { CustomerInput } from '../../customer/customer.input';
import { OrderItemInput } from '../../order-item/order-item.input';

@InputType()
export class OrderInput {
  @Field(() => String, { name: 'id' })
  public readonly id: string;

  @Field(() => String, { name: 'code', nullable: true })
  public readonly code: string;

  @Field(() => Date, { name: 'billingDate', defaultValue: DateUtils.now })
  public readonly billingDate: Date;

  @Field(() => Date, {
    name: 'dueDate',
    defaultValue: DateUtils.addDays(DateUtils.now, 30),
  })
  public readonly dueDate: Date;

  @Field(() => CustomerInput, { name: 'customer' })
  public readonly customer: CustomerInput;

  @Field(() => [OrderItemInput], { name: 'items' })
  public readonly items: OrderItemInput[];

  @Field(() => OrderLifeCycleEnum, { name: 'lifeCycle' })
  public readonly lifeCycle: OrderLifeCycleEnum;
}
