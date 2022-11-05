import { DtoBuilder } from '@lib/fdo-graphql/dto/dto.builder';
import { PropertyDto } from '../property/property.dto';
import { SettingDto } from './setting.dto';
import {
  SettingCodeEnum,
  SettingCodeEnumProvider,
} from '../../../domain/enums/setting/setting.enum';

export class SettingDtoBuilder extends DtoBuilder {
  private _code: SettingCodeEnum;
  private _properties: PropertyDto[];

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

  public get properties(): PropertyDto[] {
    return this._properties;
  }

  public setProperties(value: PropertyDto[]) {
    this._properties = value;
    return this;
  }

  build(): SettingDto {
    return new SettingDto(this);
  }
}
