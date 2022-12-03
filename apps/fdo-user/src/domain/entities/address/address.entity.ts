import { EntityModel } from '@lib/fdo-database/mongodb/entity/entity.model';
import { StringValidationUtils } from '@lib/fdo-utils/string-validation.utils';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AddressBuilder } from './address.entity.builder';

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
export class Address extends EntityModel {
  @Prop({ required: true })
  public readonly address: string;

  @Prop({ required: false })
  public readonly additionalAddress: string;

  @Prop({ required: true })
  public readonly city: string;

  @Prop({ required: true })
  public readonly country: string;

  @Prop({
    required: true,
    match: StringValidationUtils.PATTERNS.ZIP_CODE,
  })
  public readonly zipCode: string;

  constructor(builder: AddressBuilder) {
    super(builder);
    this.address = builder.address;
    this.city = builder.city;
    this.additionalAddress = builder.additionalAddress;
    this.zipCode = builder.zipCode;
    this.country = builder.country;
  }

  public static get Builder(): typeof AddressBuilder {
    return AddressBuilder;
  }
}

export type AddressDocument = Address & Document;
export const AddressSchema = SchemaFactory.createForClass(Address);
