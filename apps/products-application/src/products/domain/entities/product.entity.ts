import {
  EntityModel,
  IEntityModel,
} from '@lib/fdo-database/mongodb/entity/entity.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface IProduct extends IEntityModel {
  code: string;
  label: string;
  authorId: string;
}

@Schema({ timestamps: true })
export class Product extends EntityModel implements IProduct {
  @Prop({ required: true, uppercase: true })
  public readonly code: string;

  @Prop({ required: true, uppercase: true })
  public readonly label: string;

  @Prop({ type: String, required: true })
  public authorId: string;

  constructor(data: IProduct) {
    super(data);
    this.code = data.code;
    this.label = data.label;
    this.authorId = data.authorId;
  }
}

export type ProductDocument = Product & Document;
const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ code: 1, cognitoId: 1 }, { unique: true });

export { ProductSchema };
