import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

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
