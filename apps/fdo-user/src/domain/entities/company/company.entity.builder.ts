import { EntityBuilder } from '@lib/fdo-database/mongodb/entity/entity.builder';
import { Company } from './company.entity';

export class CompanyBuilder extends EntityBuilder {
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

  public build(): Company {
    return new Company(this);
  }

  public copy(user: Company): CompanyBuilder {
    super.copy(user);
    this._name = user.name;
    this._vatNumber = user.vatNumber;
    this._rcsNumber = user.rcsNumber;
    this._siret = user.siret;
    this._siren = user.siren;
    return this;
  }
}
