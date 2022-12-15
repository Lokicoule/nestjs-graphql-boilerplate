import {
  EntityModel,
  IEntityModel,
} from '@lib/fdo-database/mongodb/entity/entity.model';
import { StringValidationUtils } from '@lib/fdo-utils/string-validation.utils';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface ICompany extends IEntityModel {
  name: string;
  vatNumber: string;
  rcsNumber: string;
  siretNumber: string;
  sirenNumber: string;
}

@Schema({ timestamps: true })
export class Company extends EntityModel {
  @Prop({ required: true, unique: true, uppercase: true })
  public name: string;

  @Prop({
    required: true,
    unique: true,
    uppercase: true,
    match: StringValidationUtils.PATTERNS.VAT,
  })
  public vatNumber: string;

  @Prop({
    required: true,
    uppercase: true,
    match: StringValidationUtils.PATTERNS.RCS,
  })
  public rcsNumber: string;

  @Prop({
    required: true,
    uppercase: true,
    match: StringValidationUtils.PATTERNS.SIRET,
  })
  public siretNumber: string;

  @Prop({
    required: true,
    uppercase: true,
    match: StringValidationUtils.PATTERNS.SIREN,
  })
  public sirenNumber: string;

  constructor(data: ICompany) {
    super(data);
    this.name = data.name;
    this.vatNumber = data.vatNumber;
    this.rcsNumber = data.rcsNumber;
    this.siretNumber = data.siretNumber;
    this.sirenNumber = data.sirenNumber;
  }
}

export type CompanyDocument = Company & Document;
export const CompanySchema = SchemaFactory.createForClass(Company);
