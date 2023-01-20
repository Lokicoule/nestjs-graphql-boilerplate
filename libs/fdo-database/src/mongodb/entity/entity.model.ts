import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export const BaseId = MongooseSchema.Types.ObjectId;

export interface IEntityModel {
  _id?: ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class EntityModel implements IEntityModel {
  public _id: ObjectId | string;

  @Prop()
  public readonly createdAt?: Date;

  @Prop()
  public readonly updatedAt?: Date;

  constructor(data: IEntityModel) {
    this._id = data._id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
