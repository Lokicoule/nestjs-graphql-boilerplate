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

  @Field(() => String, { name: 'address' })
  public readonly address: string;

  @Field(() => String, { name: 'additionalAddress', nullable: true })
  public readonly additionalAddress: string;

  @Field(() => String, { name: 'city' })
  public readonly city: string;

  @Field(() => String, { name: 'country' })
  public readonly country: string;

  @Field(() => String, { name: 'zipCode' })
  public readonly zipCode: string;
}
