import { Field, InputType } from '@nestjs/graphql';

export interface IBaseInput {
  id: string;
}

@InputType()
export class BaseInput implements IBaseInput {
  @Field(() => String, { name: 'id' })
  public readonly id: string;

  constructor(data: IBaseInput) {
    this.id = data?.id;
  }
}
