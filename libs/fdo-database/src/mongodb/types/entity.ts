import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class Entity {
  @Prop({ name: '_id' })
  protected _id: Types.ObjectId;

  @Prop()
  protected createdAt: Date;

  @Prop()
  protected updatedAt: Date;

  constructor() {
    this._id = new Types.ObjectId();
  }

  public get id(): Types.ObjectId {
    return this._id;
  }

  public set id(id: Types.ObjectId) {
    this._id = id;
  }

  protected static generateObjectId(
    id?: string | number | Buffer | Uint8Array,
  ) {
    return new Types.ObjectId(id);
  }
}
