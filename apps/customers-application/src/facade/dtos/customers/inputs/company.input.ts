import { Field, InputType } from '@nestjs/graphql';

/**
 * @class CompanyInput
 * @description Input Type for Company
 * @see CompanyDto
 */
@InputType()
export class CompanyInput {
  @Field(() => String, { name: 'id', nullable: true })
  public readonly id: string;

  @Field(() => String, { name: 'name' })
  public readonly name: string;

  @Field(() => String, { name: 'vatNumber' })
  public readonly vatNumber: string;

  @Field(() => String, { name: 'rcsNumber' })
  public readonly rcsNumber: string;

  @Field(() => String, { name: 'siretNumber' })
  public readonly siretNumber: string;

  @Field(() => String, { name: 'sirenNumber' })
  public readonly sirenNumber: string;
}
