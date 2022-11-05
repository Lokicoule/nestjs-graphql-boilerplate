import { DtoModel } from '@lib/fdo-graphql';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  SettingCodeEnum,
  SettingCodeEnumProvider,
} from '../../../domain/enums/setting/setting.enum';
import { PropertyDto } from '../property/property.dto';
import { SettingDtoBuilder } from './setting.dto.builder';

registerEnumType(SettingCodeEnumProvider.useValue, {
  name: SettingCodeEnumProvider.provide,
});

@ObjectType()
export class SettingDto extends DtoModel {
  @Field(() => SettingCodeEnum, { name: 'code' })
  private _code: SettingCodeEnum;

  @Field(() => [PropertyDto], { name: 'properties', nullable: true })
  private _properties: PropertyDto[];

  constructor(builder: SettingDtoBuilder) {
    super(builder);
    this._code = builder.code;
    this._properties = builder.properties;
  }

  public get code(): SettingCodeEnum {
    return this._code;
  }

  public get properties(): PropertyDto[] {
    return this._properties;
  }
}
