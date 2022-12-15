import { Field, InputType } from '@nestjs/graphql';
import { AddressInput } from './address.input';
import { CompanyInput } from './company.input';

@InputType()
export class UserInput {
  @Field(() => String, { name: 'id' })
  public readonly id: string;

  @Field(() => String, { name: 'firstName' })
  public readonly firstName: string;

  @Field(() => String, { name: 'lastName' })
  public readonly lastName: string;

  @Field(() => String, { name: 'email' })
  public readonly email: string;

  @Field(() => String, { name: 'phone' })
  public readonly phone: string;

  @Field(() => AddressInput, { name: 'address', nullable: true })
  public readonly address: AddressInput;

  @Field(() => CompanyInput, { name: 'company', nullable: true })
  public readonly company: CompanyInput;
}
