import { DtoModel } from './dto.model';

export class DtoBuilder {
  private _id: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  public get id(): string {
    return this._id;
  }

  public setId(value: string) {
    this._id = value;
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

  build(): DtoModel {
    return new DtoModel(this);
  }
}
