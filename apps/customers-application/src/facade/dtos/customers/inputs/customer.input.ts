import { Field, InputType } from '@nestjs/graphql';
import { AddressInput } from './address.input';
import { CompanyInput } from './company.input';

@InputType()
export class CustomerInput {
  @Field(() => String, { name: 'id' })
  public readonly id: string;

  @Field(() => String, { name: 'code', nullable: true })
  public readonly code: string;

  @Field(() => String, { name: 'name' })
  public readonly name: string;

  @Field(() => String, { name: 'email' })
  public readonly email: string;

  @Field(() => String, { name: 'phone' })
  public readonly phone: string;

  /*   @Field(() => String, { name: 'company', nullable: true })
  public readonly company?: CompanyInput;

  @Field(() => String, { name: 'billingAddress', nullable: true })
  public readonly billingAddress?: AddressInput;

  @Field(() => String, { name: 'deliveryAddress', nullable: true })
  public readonly deliveryAddress?: AddressInput;

  @Field(() => [String], { name: 'addresses', nullable: true })
  public readonly addresses?: string[]; */
}
