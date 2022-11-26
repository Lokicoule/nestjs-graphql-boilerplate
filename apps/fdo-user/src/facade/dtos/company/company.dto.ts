import { DtoModel } from '@lib/fdo-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { CompanyDtoBuilder } from './company.dto.builder';

/**
 * @class CompanyDto
 * @description Data Transfer Object for Company
 * @see CompanyDtoBuilder
 * @see DtoModel
 */
@ObjectType()
export class CompanyDto extends DtoModel {
  @Field(() => String, { name: 'name' })
  private _name: string;

  @Field(() => String, { name: 'vatNumber' })
  private _vatNumber: string;

  @Field(() => String, { name: 'rcsNumber' })
  private _rcsNumber: string;

  @Field(() => String, { name: 'siret' })
  private _siret: string;

  @Field(() => String, { name: 'siren' })
  private _siren: string;

  constructor(builder: CompanyDtoBuilder) {
    super(builder);
    this._name = builder.name;
    this._vatNumber = builder.vatNumber;
    this._rcsNumber = builder.rcsNumber;
    this._siret = builder.siret;
    this._siren = builder.siren;
  }

  public get name(): string {
    return this._name;
  }

  public get vatNumber(): string {
    return this._vatNumber;
  }

  public get rcsNumber(): string {
    return this._rcsNumber;
  }

  public get siret(): string {
    return this._siret;
  }

  public get siren(): string {
    return this._siren;
  }
}
