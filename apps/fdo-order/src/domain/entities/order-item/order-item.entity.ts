import { EntityModel } from '@lib/fdo-database/mongodb/entity/entity.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../product/product.entity';
import { OrderItemBuilder } from './order-item.entity.builder';

@Schema()
export class OrderItem extends EntityModel {
  @Prop({
    type: ProductSchema,
    required: true,
  })
  public readonly product: Product;

  @Prop({ required: true })
  public readonly amount: number;

  @Prop({ required: true })
  public readonly unitPrice: number;

  @Prop()
  public readonly batchNumber: string;

  @Prop()
  public readonly containerNumber: string;

  @Prop({ type: Date })
  public readonly bestBeforeDate: Date;

  constructor(builder: OrderItemBuilder) {
    super(builder);
    this.product = builder.product;
    this.amount = builder.amount;
    this.unitPrice = builder.unitPrice;
    this.batchNumber = builder.batchNumber;
    this.containerNumber = builder.containerNumber;
    this.bestBeforeDate = builder.bestBeforeDate;
  }

  public static get Builder(): typeof OrderItemBuilder {
    return OrderItemBuilder;
  }
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
