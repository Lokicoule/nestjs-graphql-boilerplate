import {
  BaseId,
  EntityModel,
  IEntityModel,
} from '@lib/fdo-database/mongodb/entity/entity.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address, AddressSchema } from './address.entity';

export interface ICustomer extends IEntityModel {
  code: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  billingAddress?: Address;
  deliveryAddress?: Address;
  addresses?: Address[];
  authorId: string;
}

@Schema({ timestamps: true })
export class Customer extends EntityModel implements ICustomer {
  @Prop({ required: true, uppercase: true })
  public readonly code: string;

  @Prop({ required: true })
  public readonly name: string;

  @Prop({ required: false, lowercase: true })
  public readonly email: string;

  @Prop({ required: false, lowercase: true })
  public readonly phoneNumber: string;

  @Prop({
    type: BaseId,
    ref: Address.name,
    required: false,
  })
  public readonly billingAddress: Address;

  @Prop({
    type: BaseId,
    ref: Address.name,
    required: false,
  })
  public readonly deliveryAddress: Address;

  @Prop({
    type: [AddressSchema],
    required: false,
  })
  public readonly addresses?: Address[];

  @Prop({ type: String, required: true })
  public authorId: string;

  constructor(data: ICustomer) {
    super(data);
    this.code = data.code;
    this.name = data.name;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.billingAddress = data?.billingAddress;
    this.deliveryAddress = data?.deliveryAddress;
    this.addresses = data?.addresses;

    this.authorId = data.authorId;
  }
}

export type CustomerDocument = Customer & Document;
const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.index({ code: 1, authorId: 1 }, { unique: true });

export { CustomerSchema };
