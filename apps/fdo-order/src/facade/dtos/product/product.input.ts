import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProductInput {
  @Field(() => String, { name: 'id', nullable: true })
  public readonly id: string;

  @Field(() => String, { name: 'code' })
  public readonly code: string;

  @Field(() => String, { name: 'label' })
  public readonly label: string;
}
