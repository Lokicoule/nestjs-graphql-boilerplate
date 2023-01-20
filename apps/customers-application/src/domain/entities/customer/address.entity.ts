import {
  EntityModel,
  IEntityModel,
} from '@lib/fdo-database/mongodb/entity/entity.model';
import { StringValidationUtils } from '@lib/fdo-utils/string-validation.utils';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface IAddress extends IEntityModel {
  address: string;
  city: string;
  additionalAddress?: string;
  zipCode: string;
  country: string;
}

/**
 * @class Address
 * @description Address class is used to represent an address.
 * @extends EntityModel
 * @property {string} address - The address.
 * @property {string} city - The city.
 * @property {string} additionalAddress - The additionalAddress.
 * @property {string} zipCode - The zip code.
 * @property {string} country - The country.
 */
@Schema({ timestamps: true })
export class Address extends EntityModel implements IAddress {
  @Prop({ required: true })
  public address: string;

  @Prop({ required: false })
  public additionalAddress: string;

  @Prop({ required: true })
  public city: string;

  @Prop({ required: true })
  public country: string;

  @Prop({
    required: true,
    match: StringValidationUtils.PATTERNS.ZIP_CODE,
  })
  public zipCode: string;

  constructor(data: IAddress) {
    super(data);
    this.address = data.address;
    this.additionalAddress = data.additionalAddress;
    this.city = data.city;
    this.country = data.country;
    this.zipCode = data.zipCode;
  }
}

export type AddressDocument = Address & Document;
export const AddressSchema = SchemaFactory.createForClass(Address);
