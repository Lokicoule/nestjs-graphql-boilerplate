import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteCustomersMutation {
  @Field(() => [String], { name: 'ids' })
  public readonly ids: string[];
}
