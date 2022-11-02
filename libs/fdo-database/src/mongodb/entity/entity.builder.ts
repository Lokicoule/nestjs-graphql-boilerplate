import { Types } from 'mongoose';
import { EntityModel } from './entity.model';

export class EntityBuilder {
  private _id: Types.ObjectId;
  private _createdAt: Date;
  private _updatedAt: Date;

  public get id(): Types.ObjectId {
    return this._id;
  }

  public setId(value: string | number | Types.ObjectId | Buffer | Uint8Array) {
    if (Boolean(value) && Types.ObjectId.isValid(value)) {
      this._id =
        value instanceof Types.ObjectId ? value : new Types.ObjectId(value);
    } else {
      this._id = undefined;
    }
    return this;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public setCreatedAt(value: Date) {
    this._createdAt = value;
    return this;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public setUpdatedAt(value: Date) {
    this._updatedAt = value;
    return this;
  }

  public build(): EntityModel {
    return new EntityModel(this);
  }

  public copy(entity: EntityModel): EntityBuilder {
    this._id = entity._id;
    this._createdAt = entity.createdAt;
    this._updatedAt = entity.updatedAt;
    return this;
  }
}
