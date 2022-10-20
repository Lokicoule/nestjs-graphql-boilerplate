import { Field, InputType, PartialType } from '@nestjs/graphql';
import { AddressDto } from './address.dto';

@InputType()
export class AddressInput {
  @Field(() => String, { name: 'street', nullable: true })
  private _street?: string;

  @Field(() => String, { name: 'city' })
  private _city: string;

  @Field(() => String, { name: 'state' })
  private _state: string;

  @Field(() => String, { name: 'zipCode' })
  private _zipCode: string;

  @Field(() => String, { name: 'country' })
  private _country: string;
}
