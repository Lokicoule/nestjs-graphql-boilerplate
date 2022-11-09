import { EntityModel } from '@lib/fdo-database/mongodb/entity/entity.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductBuilder } from './product.entity.builder';

@Schema({ timestamps: true })
export class Product extends EntityModel {
  @Prop({ required: true, unique: true, uppercase: true })
  public readonly code: string;

  @Prop({ required: true, uppercase: true })
  public readonly label: string;

  constructor(builder: ProductBuilder) {
    super(builder);
    this.code = builder.code;
    this.label = builder.label;
  }

  public static get Builder(): typeof ProductBuilder {
    return ProductBuilder;
  }
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
