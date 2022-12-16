import { DtoModel, IDtoModel } from '@lib/fdo-graphql';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { AddressDto } from './address.dto';
import { CompanyDto } from './company.dto';

interface IUserDto extends IDtoModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: AddressDto;
  company: CompanyDto;
}

@ObjectType()
@Directive('@key(fields: "id")')
export class UserDto extends DtoModel implements IUserDto {
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

  constructor(data: IUserDto) {
    super(data);
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this.company = data.company;
  }
}
