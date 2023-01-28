import { Field, ID, ObjectType } from '@nestjs/graphql';

export interface IBaseOutput {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@ObjectType()
export class BaseOutput implements IBaseOutput {
  @Field(() => ID, { name: 'id' })
  public readonly id: string;

  @Field(() => Date, { name: 'createdAt', nullable: true })
  public readonly createdAt: Date;

  @Field(() => Date, { name: 'updatedAt', nullable: true })
  public readonly updatedAt: Date;

  constructor(data: IBaseOutput) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
