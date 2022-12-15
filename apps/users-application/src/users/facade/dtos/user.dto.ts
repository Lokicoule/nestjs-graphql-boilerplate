import { DtoModel } from '@lib/fdo-graphql';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { AddressDto } from './address.dto';
import { CompanyDto } from './company.dto';

@ObjectType()
@Directive('@key(fields: "id")')
export class UserDto extends DtoModel {
  /*   @Field((type) => ID)
  id: string; */

  @Field(() => String, { name: 'firstName' })
  public firstName: string;

  @Field(() => String, { name: 'lastName' })
  public lastName: string;

  @Field(() => String, { name: 'email' })
  public email: string;

  @Field(() => String, { name: 'phone' })
  public phone: string;

  @Field(() => AddressDto, { name: 'address', nullable: true })
  public address: AddressDto;

  @Field(() => CompanyDto, { name: 'company', nullable: true })
  public company: CompanyDto;

  constructor(data: UserDto) {
    super(data);
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this.company = data.company;
  }
}
