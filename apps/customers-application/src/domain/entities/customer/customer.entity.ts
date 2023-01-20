import {
  EntityModel,
  IEntityModel,
  BaseId,
} from '@lib/fdo-database/mongodb/entity/entity.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address, AddressSchema } from './address.entity';
import { Company, CompanySchema } from './company.entity';

export interface ICustomer extends IEntityModel {
  code: string;
  name: string;
  email: string;
  phone: string;
  authorId: string;
  /*   company?: Company;
  billingAddress: Address;
  deliveryAddress: Address;
  addresses: Address[];*/
}

@Schema({ timestamps: true })
export class Customer extends EntityModel implements ICustomer {
  @Prop({ required: true, uppercase: true })
  public readonly code: string;

  @Prop({ required: true })
  public readonly name: string;

  @Prop({ required: true, lowercase: true })
  public readonly email: string;

  @Prop({ required: true, lowercase: true })
  public readonly phone: string;

  /* @Prop({
    type: CompanySchema,
  })
  public readonly company?: Company;

  @Prop({
    type: BaseId,
    ref: Address.name,
    required: true,
  })
  public readonly billingAddress: Address;

  @Prop({
    type: BaseId,
    ref: Address.name,
    required: true,
  })
  public readonly deliveryAddress: Address;

  @Prop({
    type: [AddressSchema],
  })
  public readonly addresses: Address[]; */

  @Prop({ type: String, required: true })
  public authorId: string;

  constructor(data: ICustomer) {
    super(data);
    this.code = data.code;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.authorId = data.authorId;
    /* this.company = data.company;
    this.billingAddress = data.billingAddress;
    this.deliveryAddress = data.deliveryAddress;
    this.addresses = data.addresses;*/
  }
}

export type CustomerDocument = Customer & Document;
const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.index({ code: 1, authorId: 1 }, { unique: true });

export { CustomerSchema };
