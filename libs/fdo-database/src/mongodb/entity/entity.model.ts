import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { EntityBuilder } from './entity.builder';

export class EntityModel {
  public readonly _id: Types.ObjectId;

  @Prop()
  public readonly createdAt: Date;

  @Prop()
  public readonly updatedAt: Date;

  constructor(builder: EntityBuilder) {
    if (Boolean(builder)) {
      this._id = builder.id;
      this.createdAt = builder.createdAt;
      this.updatedAt = builder.updatedAt;
    }
  }

  public get id(): Types.ObjectId {
    return this._id;
  }
}
