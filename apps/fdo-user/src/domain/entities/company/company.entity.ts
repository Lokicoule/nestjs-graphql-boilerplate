import { EntityModel } from '@lib/fdo-database/mongodb/entity/entity.model';
import { StringValidationUtils } from '@lib/fdo-utils/string-validation.utils';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CompanyBuilder } from './company.entity.builder';

@Schema({ timestamps: true })
export class Company extends EntityModel {
  @Prop({ required: true, unique: true, uppercase: true })
  public readonly name: string;

  @Prop({
    required: true,
    unique: true,
    uppercase: true,
    match: StringValidationUtils.PATTERNS.VAT,
  })
  public readonly vatNumber: string;

  @Prop({
    required: true,
    uppercase: true,
    match: StringValidationUtils.PATTERNS.RCS,
  })
  public readonly rcsNumber: string;

  @Prop({
    required: true,
    uppercase: true,
    match: StringValidationUtils.PATTERNS.SIRET,
  })
  public readonly siret: string;

  @Prop({
    required: true,
    uppercase: true,
    match: StringValidationUtils.PATTERNS.SIREN,
  })
  public readonly siren: string;

  constructor(builder: CompanyBuilder) {
    super(builder);
    this.name = builder.name;
    this.vatNumber = builder.vatNumber;
    this.rcsNumber = builder.rcsNumber;
    this.siren = builder.siren;
    this.siret = builder.siret;
  }

  public static get Builder(): typeof CompanyBuilder {
    return CompanyBuilder;
  }
}

export type CompanyDocument = Company & Document;
export const CompanySchema = SchemaFactory.createForClass(Company);
