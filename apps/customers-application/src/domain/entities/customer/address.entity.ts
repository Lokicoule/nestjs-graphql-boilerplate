import {
  EntityModel,
  IEntityModel,
} from '@lib/fdo-database/mongodb/entity/entity.model';
import { StringValidationUtils } from '@lib/fdo-utils/string-validation.utils';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface IAddress extends IEntityModel {
  name: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  zipCode: string;
  country: string;
}

/**
 * @class Address
 * @description Address class is used to represent an address.
 * @extends EntityModel
 * @implements IAddress
 * @see IAddress
 * @see EntityModel
 */
@Schema({ timestamps: true })
export class Address extends EntityModel implements IAddress {
  @Prop({ required: true })
  public readonly name: string;

  @Prop({ required: true })
  public readonly phoneNumber: string;

  @Prop({ required: true })
  public readonly addressLine1: string;

  @Prop({ required: false })
  public readonly addressLine2: string;

  @Prop({ required: true })
  public readonly city: string;

  @Prop({ required: true })
  public readonly country: string;

  @Prop({
    required: true,
    match: StringValidationUtils.PATTERNS.ZIP_CODE,
  })
  public readonly zipCode: string;

  constructor(data: IAddress) {
    super(data);
    this.name = data.name;
    this.phoneNumber = data.phoneNumber;
    this.addressLine1 = data.addressLine1;
    this.addressLine2 = data.addressLine2;
    this.city = data.city;
    this.country = data.country;
    this.zipCode = data.zipCode;
  }
}

export type AddressDocument = Address & Document;
export const AddressSchema = SchemaFactory.createForClass(Address);
