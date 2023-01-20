import {
  EntityModel,
  IEntityModel,
} from '@lib/fdo-database/mongodb/entity/entity.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SettingCodeEnum } from '../../enums';
import { Property, PropertySchema } from './property.entity';

export interface ISetting extends IEntityModel {
  authorId: string;
  code: SettingCodeEnum;
  properties: Property[];
}

@Schema({ timestamps: true })
export class Setting extends EntityModel {
  @Prop({ type: String, required: true, uppercase: true })
  public readonly code: SettingCodeEnum;

  @Prop({
    type: [PropertySchema],
  })
  public readonly properties: Property[];

  @Prop({ type: String, required: true })
  public authorId: string;

  constructor(data: ISetting) {
    super(data);
    this.code = data.code;
    this.properties = data.properties;
    this.authorId = data.authorId;
  }
}

export type SettingDocument = Setting & Document;
const SettingSchema = SchemaFactory.createForClass(Setting);

SettingSchema.index({ code: 1, authorId: 1 }, { unique: true });

export { SettingSchema };
