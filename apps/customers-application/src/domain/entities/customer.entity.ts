import {
  EntityModel,
  IEntityModel,
} from '@lib/fdo-database/mongodb/entity/entity.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface ICustomer extends IEntityModel {
  code: string;
  label: string;
  authorId: string;
}

@Schema({ timestamps: true })
export class Customer extends EntityModel implements ICustomer {
  @Prop({ required: true, uppercase: true })
  public readonly code: string;

  @Prop({ required: true, uppercase: true })
  public readonly label: string;

  @Prop({ type: String, required: true })
  public authorId: string;

  constructor(data: ICustomer) {
    super(data);
    this.code = data.code;
    this.label = data.label;
    this.authorId = data.authorId;
  }
}

export type CustomerDocument = Customer & Document;
const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.index({ code: 1, authorId: 1 }, { unique: true });

export { CustomerSchema };
