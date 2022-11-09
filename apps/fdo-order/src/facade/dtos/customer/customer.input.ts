import { Field, InputType } from '@nestjs/graphql';
import { AddressInput } from '../address/address.input';

@InputType()
export class CustomerInput {
  @Field(() => String, { name: 'id', nullable: true })
  public readonly id: string;

  @Field(() => String, { name: 'code' })
  public readonly code: string;

  @Field(() => String, { name: 'name' })
  public readonly name: string;

  @Field(() => AddressInput, { name: 'deliveryAddress', nullable: true })
  public readonly deliveryAddress: AddressInput;

  @Field(() => AddressInput, { name: 'invoiceAddress', nullable: true })
  public readonly invoiceAddress: AddressInput;
}
