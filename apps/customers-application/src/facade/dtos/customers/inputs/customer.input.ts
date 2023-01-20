import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CustomerInput {
  @Field(() => String, { name: 'id' })
  public readonly id: string;

  @Field(() => String, { name: 'code', nullable: true })
  public readonly code: string;

  @Field(() => String, { name: 'label' })
  public readonly label: string;
}
