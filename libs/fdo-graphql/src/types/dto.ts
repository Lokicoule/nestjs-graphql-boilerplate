import { Field, ID, ObjectType } from '@nestjs/graphql';

export type DtoProps = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

@ObjectType()
export class Dto {
  @Field(() => ID, { name: 'id' })
  protected readonly _id: string;

  @Field(() => Date, { name: 'createdAt', nullable: true })
  protected readonly _createdAt: Date;

  @Field(() => Date, { name: 'updatedAt', nullable: true })
  protected readonly _updatedAt: Date;

  constructor(props: DtoProps) {
    const { id, createdAt, updatedAt } = props;
    if (Boolean(id)) this._id = id;
    if (Boolean(createdAt)) this._createdAt = createdAt;
    if (Boolean(updatedAt)) this._updatedAt = updatedAt;
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
