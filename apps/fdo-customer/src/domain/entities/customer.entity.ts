import { EntityModel } from '@lib/fdo-database/mongodb/types/entity.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address, AddressSchema } from './address.entity';
import { CustomerBuilder } from './customer.entity.builder';

/**
 * @class Customer
 * @description Customer class is used to represent a customer.
 * @extends EntityModel
 * @property {string} code - The customer code.
 * @property {string} name - The customer name.
 * @property {Address[]} addresses - The customer addresses.
 */
@Schema({ timestamps: true })
export class Customer extends EntityModel {
  @Prop({ required: true })
  public readonly code: string;

  @Prop({ required: true })
  public readonly name: string;

  @Prop({
    type: [AddressSchema],
  })
  public readonly addresses: Address[];

  constructor(builder: CustomerBuilder) {
    super(builder);
    if (Boolean(builder)) {
      this.code = builder.code;
      this.name = builder.name;
      this.addresses = builder.addresses;
    }
  }
}

export type CustomerDocument = Customer & Document;
export const CustomerSchema = SchemaFactory.createForClass(Customer);
