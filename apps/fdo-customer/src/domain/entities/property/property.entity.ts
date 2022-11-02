import { EntityModel } from '@lib/fdo-database/mongodb/entity/entity.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PropertyBuilder } from './property.entity.builder';
import { PropertyKeyEnum } from '../../enums/property/property.enum';

@Schema({ timestamps: true })
export class Property extends EntityModel {
  @Prop({ type: String, required: true, uppercase: true })
  public readonly key: PropertyKeyEnum;

  @Prop({ required: true, uppercase: true })
  public readonly value: string;

  constructor(builder: PropertyBuilder) {
    super(builder);
    this.key = builder.key;
    this.value = builder.value;
  }

  public static get Builder(): typeof PropertyBuilder {
    return PropertyBuilder;
  }
}

export type PropertyDocument = Property & Document;
export const PropertySchema = SchemaFactory.createForClass(Property);
