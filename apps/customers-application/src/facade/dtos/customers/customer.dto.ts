import { DtoModel, IDtoModel } from '@lib/fdo-graphql';
import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { UserDto } from '../users';
import { AddressDto } from './address.dto';
import { CompanyDto } from './company.dto';

export interface ICustomerDto extends IDtoModel {
  code: string;
  name: string;
  email: string;
  phone: string;
  /*   company?: CompanyDto;
  billingAddress: AddressDto;
  deliveryAddress: AddressDto;
  addresses: AddressDto[]; */
  authorId: string;
  user?: UserDto;
}

@ObjectType()
@Directive('@key(fields: "id")')
export class CustomerDto extends DtoModel {
  @Field((type) => String)
  public readonly code: string;

  @Field((type) => String)
  public readonly name: string;

  @Field((type) => String)
  public readonly email: string;

  @Field((type) => String)
  public readonly phone: string;

  /*   @Field((type) => CompanyDto, { nullable: true })
  public readonly company?: CompanyDto;

  @Field((type) => AddressDto)
  public readonly billingAddress: AddressDto;

  @Field((type) => AddressDto)
  public readonly deliveryAddress: AddressDto;

  @Field((type) => [AddressDto])
  public readonly addresses: AddressDto[]; */

  @Field((type) => String)
  public readonly authorId: string;

  @Field((type) => UserDto)
  public readonly user?: UserDto;

  constructor(data: ICustomerDto) {
    super(data);
    this.code = data.code;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    /*     this.company = data.company;
    this.billingAddress = data.billingAddress;
    this.deliveryAddress = data.deliveryAddress;
    this.addresses = data.addresses; */
    this.authorId = data.authorId;
    this.user = data.user;
  }
}
