import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteProductsMutation {
  @Field(() => [String], { name: 'ids' })
  public readonly ids: string[];
}
