import { EntityModel } from '@lib/fdo-database/mongodb/entity/entity.model';
import { DateUtils } from '@lib/fdo-utils/date.utils';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from '../customer/customer.entity';
import { OrderItem, OrderItemSchema } from '../order-item/order-item.entity';
import { OrderBuilder } from './order.entity.builder';

@Schema({ timestamps: true })
export class Order extends EntityModel {
  @Prop({ required: true, unique: true, uppercase: true })
  public readonly code: string;

  @Prop({ type: Date, default: DateUtils.now })
  public readonly billingDate: Date;

  @Prop({
    type: Date,
    default: () => DateUtils.addDays(DateUtils.now, 30),
  })
  public readonly dueDate: Date;

  @Prop({
    type: CustomerSchema,
    required: true,
  })
  public readonly customer: Customer;

  @Prop({
    type: [OrderItemSchema],
  })
  public readonly items: OrderItem[];

  @Prop({ required: true, uppercase: true })
  public readonly lifeCycle: string;

  constructor(builder: OrderBuilder) {
    super(builder);
    this.code = builder.code;
    this.billingDate = builder.billingDate;
    this.dueDate = builder.dueDate;
    this.customer = builder.customer;
    this.items = builder.items;
    this.lifeCycle = builder.lifeCycle;
  }

  public static get Builder(): typeof OrderBuilder {
    return OrderBuilder;
  }
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
