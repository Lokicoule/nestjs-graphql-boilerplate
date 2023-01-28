import { BaseOutput, IBaseOutput } from '@lib/fdo-graphql';
import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { IsPhoneNumber, IsEmail } from 'class-validator';
import { UserOutput } from '../users';
import { AddressOutput } from './address.output';

export interface ICustomerOutput extends IBaseOutput {
  code: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  billingAddress?: AddressOutput;
  deliveryAddress?: AddressOutput;
  addresses?: AddressOutput[];
  authorId: string;
  user?: UserOutput;
}

@ObjectType()
@Directive('@key(fields: "id")')
export class CustomerOutput extends BaseOutput implements ICustomerOutput {
  @Field((type) => String)
  public readonly code: string;

  @Field((type) => String)
  public readonly name: string;

  @Field((type) => String, { nullable: true })
  @IsEmail()
  public readonly email: string;

  @Field((type) => String, { nullable: true })
  @IsPhoneNumber()
  public readonly phoneNumber: string;

  @Field((type) => AddressOutput, { nullable: true })
  public readonly billingAddress: AddressOutput;

  @Field((type) => AddressOutput, { nullable: true })
  public readonly deliveryAddress: AddressOutput;

  @Field((type) => [AddressOutput], { nullable: true })
  public readonly addresses: AddressOutput[];

  @Field((type) => String)
  public readonly authorId: string;

  @Field((type) => UserOutput)
  public readonly user?: UserOutput;

  constructor(data: ICustomerOutput) {
    super(data);
    this.code = data.code;
    this.name = data.name;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.billingAddress = data.billingAddress;
    this.deliveryAddress = data.deliveryAddress;
    this.addresses = data.addresses;
    this.authorId = data.authorId;
    this.user = data.user;
  }
}
