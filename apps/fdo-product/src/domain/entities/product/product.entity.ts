import { EntityModel } from '@lib/fdo-database/mongodb/entity/entity.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductBuilder } from './product.entity.builder';

@Schema({
  timestamps: true,
})
export class Product extends EntityModel {
  @Prop({ required: true })
  public readonly cognitoId: string;

  @Prop({ required: true, uppercase: true })
  public readonly code: string;

  @Prop({ required: true, uppercase: true })
  public readonly label: string;

  constructor(builder: ProductBuilder) {
    super(builder);
    this.cognitoId = builder.cognitoId;
    this.code = builder.code;
    this.label = builder.label;
  }

  public static get Builder(): typeof ProductBuilder {
    return ProductBuilder;
  }
}

export type ProductDocument = Product & Document;
const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ code: 1, cognitoId: 1 });

export { ProductSchema };
