import { Field, InputType } from '@nestjs/graphql';
import { OrderLifeCycleEnum } from '../../../../domain/enums/order/order.enum';
import { CustomerInput } from '../../customer/customer.input';
import { OrderItemInput } from '../../order-item/order-item.input';

@InputType()
export class OrderInput {
  @Field(() => String, { name: 'id' })
  public readonly id: string;

  @Field(() => String, { name: 'code', nullable: true })
  public readonly code: string;

  @Field(() => Date, {
    name: 'billingDate',
    nullable: true,
  })
  public readonly billingDate: Date;

  @Field(() => Date, {
    name: 'dueDate',
    nullable: true,
  })
  public readonly dueDate: Date;

  @Field(() => CustomerInput, { name: 'customer' })
  public readonly customer: CustomerInput;

  @Field(() => [OrderItemInput], { name: 'items' })
  public readonly items: OrderItemInput[];

  @Field(() => OrderLifeCycleEnum, { name: 'lifeCycle', nullable: true })
  public readonly lifeCycle: OrderLifeCycleEnum;
}
