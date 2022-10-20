import { Field, InputType } from '@nestjs/graphql';
import { AddressInput } from '../address/address.input';

@InputType()
export class CustomerInput {
  @Field(() => String, { name: 'code' })
  private _code: string;

  @Field(() => String, { name: 'name' })
  private _name: string;

  @Field(() => [AddressInput], { name: 'addresses', nullable: true })
  private _addresses: AddressInput[];
}
