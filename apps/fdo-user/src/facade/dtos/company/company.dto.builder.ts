import { DtoBuilder } from '@lib/fdo-graphql/dto/dto.builder';
import { CompanyDto } from './company.dto';

/**
 * @class CompanyDtoBuilder
 * @description This class is used to build a CompanyDto object.
 * @see CompanyDto
 */
export class CompanyDtoBuilder extends DtoBuilder {
  private _name: string;
  private _vatNumber: string;
  private _rcsNumber: string;
  private _siret: string;
  private _siren: string;

  public get name(): string {
    return this._name;
  }

  public setName(value: string) {
    this._name = value;
    return this;
  }

  public get vatNumber(): string {
    return this._vatNumber;
  }

  public setVatNumber(value: string) {
    this._vatNumber = value;
    return this;
  }

  public get rcsNumber(): string {
    return this._rcsNumber;
  }

  public setRcsNumber(value: string) {
    this._rcsNumber = value;
    return this;
  }

  public get siret(): string {
    return this._siret;
  }

  public setSiret(value: string) {
    this._siret = value;
    return this;
  }

  public get siren(): string {
    return this._siren;
  }

  public setSiren(value: string) {
    this._siren = value;
    return this;
  }

  build(): CompanyDto {
    return new CompanyDto(this);
  }
}
