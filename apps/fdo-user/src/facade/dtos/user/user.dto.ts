import { DtoModel } from '@lib/fdo-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { AddressDto } from '../address/address.dto';
import { CompanyDto } from '../company/company.dto';
import { UserDtoBuilder } from './user.dto.builder';

@ObjectType()
export class UserDto extends DtoModel {
  @Field(() => String, { name: 'firstName' })
  private _firstName: string;

  @Field(() => String, { name: 'lastName' })
  private _lastName: string;

  @Field(() => String, { name: 'email' })
  private _email: string;

  @Field(() => String, { name: 'phone' })
  private _phone: string;

  @Field(() => AddressDto, { name: 'address', nullable: true })
  private _address: AddressDto;

  @Field(() => CompanyDto, { name: 'company', nullable: true })
  private _company: CompanyDto;

  constructor(builder: UserDtoBuilder) {
    super(builder);
    this._firstName = builder.firstName;
    this._lastName = builder.lastName;
    this._email = builder.email;
    this._phone = builder.phone;
    this._address = builder.address;
    this._company = builder.company;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get email(): string {
    return this._email;
  }

  public get phone(): string {
    return this._phone;
  }

  public get address(): AddressDto {
    return this._address;
  }

  public get company(): CompanyDto {
    return this._company;
  }
}
