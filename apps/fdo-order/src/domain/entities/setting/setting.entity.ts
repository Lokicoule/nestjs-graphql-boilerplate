import { EntityModel } from '@lib/fdo-database/mongodb/entity/entity.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Property, PropertySchema } from '../property/property.entity';
import { SettingBuilder } from './setting.entity.builder';
import { SettingCodeEnum } from '../../enums/setting/setting.enum';

@Schema({ timestamps: true })
export class Setting extends EntityModel {
  @Prop({ type: String, required: true, unique: true, uppercase: true })
  public readonly code: SettingCodeEnum;

  @Prop({
    type: [PropertySchema],
  })
  public readonly properties: Property[];

  constructor(builder: SettingBuilder) {
    super(builder);
    this.code = builder.code;
    this.properties = builder.properties;
  }

  public static get Builder(): typeof SettingBuilder {
    return SettingBuilder;
  }
}

export type SettingDocument = Setting & Document;
export const SettingSchema = SchemaFactory.createForClass(Setting);
