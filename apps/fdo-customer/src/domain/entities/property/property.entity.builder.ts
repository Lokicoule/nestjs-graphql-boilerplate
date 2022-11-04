import { EntityBuilder } from '@lib/fdo-database/mongodb/entity/entity.builder';
import { Property } from './property.entity';

export class PropertyBuilder extends EntityBuilder {
  private _key: string;
  private _value: string;

  public get key(): string {
    return this._key;
  }

  public setKey(value: string) {
    this._key = value;
    return this;
  }

  public get value(): string {
    return this._value;
  }

  public setValue(value: string) {
    this._value = value;
    return this;
  }

  public build(): Property {
    return new Property(this);
  }

  public copy(property: Property): PropertyBuilder {
    super.copy(property);
    this._key = property.key;
    this._value = property.value;
    return this;
  }
}
