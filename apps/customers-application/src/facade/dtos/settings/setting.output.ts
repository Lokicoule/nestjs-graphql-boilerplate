import { BaseOutput, IBaseOutput } from '@lib/fdo-graphql';
import {
  Directive,
  Field,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { SettingCodeEnum, SettingEnum } from '~/domain';
import { UserOutput } from '../users';
import { PropertyOutput } from './property.output';

registerEnumType(SettingCodeEnum, {
  name: SettingEnum.provider,
});

export interface ISettingOutput extends IBaseOutput {
  code: SettingCodeEnum;
  properties: PropertyOutput[];
  authorId: string;
  user?: UserOutput;
}

@ObjectType()
@Directive('@key(fields: "id")')
export class SettingOutput extends BaseOutput implements ISettingOutput {
  @Field(() => SettingCodeEnum, { name: 'code' })
  public readonly code: SettingCodeEnum;

  @Field(() => [PropertyOutput], { name: 'properties', nullable: true })
  public readonly properties: PropertyOutput[];

  @Field((type) => String)
  public readonly authorId: string;

  @Field((type) => UserOutput)
  public readonly user?: UserOutput;

  constructor(data: ISettingOutput) {
    super(data);
    this.code = data.code;
    this.properties = data.properties;
    this.authorId = data.authorId;
    this.user = data.user;
  }
}
