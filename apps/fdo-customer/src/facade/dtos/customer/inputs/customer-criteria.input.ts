import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CustomerCriteriaInput {
  @Field(() => String, { name: 'id', nullable: true })
  private readonly _id: string;

  @Field(() => String, { name: 'code', nullable: true })
  private readonly _code: string;

  @Field(() => String, { name: 'name', nullable: true })
  private readonly _name: string;

  public get id(): string {
    return this._id;
  }

  public get code(): string {
    return this._code;
  }

  public get name(): string {
    return this._name;
  }
}
