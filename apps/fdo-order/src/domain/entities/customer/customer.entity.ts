import { EntityModel } from '@lib/fdo-database/mongodb/entity/entity.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address, AddressSchema } from '../address/address.entity';
import { CustomerBuilder } from './customer.entity.builder';

/**
 * @class Customer
 * @description Customer class is used to represent a customer.
 * @extends EntityModel
 * @property {string} code - The customer code.
 * @property {string} name - The customer name.
 * @property {Address} deliveryAddress - The customer delivery address.
 * @property {Address} invoiceAddress - The customer invoice address.
 */
@Schema({ timestamps: true })
export class Customer extends EntityModel {
  @Prop({ required: true, unique: true, uppercase: true })
  public readonly code: string;

  @Prop({ required: true })
  public readonly name: string;

  @Prop({
    type: AddressSchema,
  })
  public readonly deliveryAddress: Address;

  @Prop({
    type: AddressSchema,
  })
  public readonly invoiceAddress: Address;

  constructor(builder: CustomerBuilder) {
    super(builder);
    this.code = builder.code;
    this.name = builder.name;
    this.deliveryAddress = builder.deliveryAddress;
    this.invoiceAddress = builder.invoiceAddress;
  }

  public static get Builder(): typeof CustomerBuilder {
    return CustomerBuilder;
  }
}

export type CustomerDocument = Customer & Document;
export const CustomerSchema = SchemaFactory.createForClass(Customer);
