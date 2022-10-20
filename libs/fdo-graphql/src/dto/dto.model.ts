import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DtoBuilder } from './dto.builder';

@ObjectType()
export class DtoModel {
  @Field(() => ID, { name: 'id' })
  protected readonly _id: string;

  @Field(() => Date, { name: 'createdAt', nullable: true })
  protected readonly _createdAt: Date;

  @Field(() => Date, { name: 'updatedAt', nullable: true })
  protected readonly _updatedAt: Date;

  constructor(builder: DtoBuilder) {
    if (Boolean(builder)) {
      this._id = builder.id;
      this._createdAt = builder.createdAt;
      this._updatedAt = builder.updatedAt;
    }
  }

  public get id(): string {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }
}
