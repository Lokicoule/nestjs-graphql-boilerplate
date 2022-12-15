import { Prop } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

export interface IEntityModel {
  _id?: ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class EntityModel {
  @Transform(({ value }) => value.toString())
  public _id: ObjectId | string;

  @Prop()
  public readonly createdAt: Date;

  @Prop()
  public readonly updatedAt: Date;

  constructor(data: IEntityModel) {
    this._id = data._id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
