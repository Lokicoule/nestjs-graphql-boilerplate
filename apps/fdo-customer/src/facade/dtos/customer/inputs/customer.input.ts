import { Field, InputType } from '@nestjs/graphql';
import { AddressInput } from '../../address/address.input';

@InputType()
export class CustomerInput {
  @Field(() => String, { name: 'id' })
  public readonly id: string;

  @Field(() => String, { name: 'code', nullable: true })
  public readonly code: string;

  @Field(() => String, { name: 'name' })
  public readonly name: string;

  @Field(() => [AddressInput], { name: 'addresses' })
  public readonly addresses: AddressInput[];
}
