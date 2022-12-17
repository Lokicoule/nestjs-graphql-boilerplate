import { DtoModel, IDtoModel } from '@lib/fdo-graphql';
import {
  Directive,
  Field,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { SettingCodeEnum, SettingEnum } from '../../domain/enums/setting.enum';
import { PropertyDto } from './property.dto';

registerEnumType(SettingCodeEnum, {
  name: SettingEnum.provider,
});

export interface ISettingDto extends IDtoModel {
  code: SettingCodeEnum;
  properties: PropertyDto[];
  authorId: string;
}

@ObjectType()
@Directive('@key(fields: "id")')
export class SettingDto extends DtoModel {
  @Field(() => SettingCodeEnum, { name: 'code' })
  public readonly code: SettingCodeEnum;

  @Field(() => [PropertyDto], { name: 'properties', nullable: true })
  public readonly properties: PropertyDto[];

  @Field((type) => String)
  public readonly authorId: string;

  constructor(data: ISettingDto) {
    super(data);
    this.code = data.code;
    this.properties = data.properties;
    this.authorId = data.authorId;
  }
}
