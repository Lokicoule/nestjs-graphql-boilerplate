import { EntityModel } from '@lib/fdo-database/mongodb/entity/entity.model';
import { StringValidationUtils } from '@lib/fdo-utils/string-validation.utils';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AddressBuilder } from './address.entity.builder';

/**
 * @class Address
 * @description Address class is used to represent an address.
 * @extends EntityModel
 * @property {string} street - The street.
 * @property {string} city - The city.
 * @property {string} state - The state.
 * @property {string} zipCode - The zip code.
 * @property {string} country - The country.
 */
@Schema({ timestamps: true })
export class Address extends EntityModel {
  @Prop({ required: true })
  public readonly city: string;

  @Prop({ required: true })
  public readonly country: string;

  @Prop({ required: true })
  public readonly state: string;

  @Prop({ required: true })
  public readonly street: string;

  @Prop({ required: true })
  public readonly number: string;

  @Prop({
    required: true,
    match: StringValidationUtils.PATTERNS.ZIP_CODE,
  })
  public readonly zipCode: string;

  constructor(builder: AddressBuilder) {
    super(builder);
    this.street = builder.street;
    this.city = builder.city;
    this.state = builder.state;
    this.zipCode = builder.zipCode;
    this.country = builder.country;
    this.number = builder.number;
  }

  public static get Builder(): typeof AddressBuilder {
    return AddressBuilder;
  }
}

export type AddressDocument = Address & Document;
export const AddressSchema = SchemaFactory.createForClass(Address);
