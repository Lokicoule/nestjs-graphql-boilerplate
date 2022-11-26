import { Field, InputType } from '@nestjs/graphql';

/**
 * @class AddressInput
 * @description Input Type for Address
 * @see AddressDto
 */
@InputType()
export class AddressInput {
  @Field(() => String, { name: 'id', nullable: true })
  public readonly id: string;

  @Field(() => String, { name: 'street' })
  public readonly street: string;

  @Field(() => String, { name: 'city' })
  public readonly city: string;

  @Field(() => String, { name: 'state' })
  public readonly state: string;

  @Field(() => String, { name: 'zipCode' })
  public readonly zipCode: string;

  @Field(() => String, { name: 'country' })
  public readonly country: string;

  @Field(() => String, { name: 'number' })
  public readonly number: string;
}
