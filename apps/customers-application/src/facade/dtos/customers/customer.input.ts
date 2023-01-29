import { BaseInput, IBaseInput } from '@lib/fdo-graphql';
import { Field, InputType } from '@nestjs/graphql';
import { IsPhoneNumber, IsEmail } from 'class-validator';
import { AddressInput } from './address.input';

export interface ICustomerInput extends IBaseInput {
  code?: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  addresses?: AddressInput[];
}

@InputType()
export class CustomerInput extends BaseInput implements ICustomerInput {
  @Field(() => String, { name: 'code', nullable: true })
  public readonly code: string;

  @Field(() => String, { name: 'name' })
  public readonly name: string;

  @Field(() => String, { name: 'email', nullable: true })
  @IsEmail()
  public readonly email: string;

  @Field(() => String, { name: 'phoneNumber', nullable: true })
  @IsPhoneNumber('FR', { message: "Le numéro de téléphone n'est pas valide." })
  public readonly phoneNumber: string;

  @Field(() => [AddressInput], { name: 'addresses', nullable: true })
  public readonly addresses?: AddressInput[];

  constructor(data: ICustomerInput) {
    super(data);
    this.code = data?.code;
    this.name = data?.name;
    this.email = data?.email;
    this.phoneNumber = data?.phoneNumber;
    this.addresses = data?.addresses;
  }
}
