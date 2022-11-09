import { EntityBuilder } from '@lib/fdo-database/mongodb/entity/entity.builder';
import { Property } from '../property/property.entity';
import { Setting } from './setting.entity';
import {
  SettingCodeEnum,
  SettingCodeEnumProvider,
} from '../../enums/setting/setting.enum';

export class SettingBuilder extends EntityBuilder {
  private _code: SettingCodeEnum;
  private _properties: Property[];

  public get code(): SettingCodeEnum {
    return this._code;
  }

  public setCode(value: string | SettingCodeEnum) {
    this._code =
      typeof value === 'string'
        ? SettingCodeEnumProvider.useFactory(value)
        : value;
    return this;
  }

  public get properties(): Property[] {
    return this._properties;
  }

  public setProperties(value: Property[]) {
    this._properties = value;
    return this;
  }

  public addProperty(value: Property) {
    if (Boolean(this._properties)) {
      this._properties.push(value);
    } else {
      this._properties = [value];
    }
    return this;
  }

  public build(): Setting {
    return new Setting(this);
  }

  public copy(setting: Setting): SettingBuilder {
    super.copy(setting);
    this._code = setting.code;
    this._properties = setting.properties;
    return this;
  }
}
