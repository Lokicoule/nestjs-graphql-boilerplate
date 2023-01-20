import {
  EntityModel,
  IEntityModel,
} from '@lib/fdo-database/mongodb/entity/entity.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface IProperty extends IEntityModel {
  key: string;
  value: string;
}

@Schema({ timestamps: true })
export class Property extends EntityModel {
  @Prop({ type: String, required: true, uppercase: true })
  public readonly key: string;

  @Prop({ required: true, uppercase: true })
  public readonly value: string;

  constructor(data: IProperty) {
    super(data);
    this.key = data.key;
    this.value = data.value;
  }
}

export type PropertyDocument = Property & Document;
export const PropertySchema = SchemaFactory.createForClass(Property);
