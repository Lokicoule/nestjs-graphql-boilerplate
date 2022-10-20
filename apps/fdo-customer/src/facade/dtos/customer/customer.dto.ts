import { DtoModel } from '@lib/fdo-graphql';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AddressDto } from '../address/address.dto';
import { CustomerDtoBuilder } from './customer.dto.builder';

@ObjectType()
export class CustomerDto extends DtoModel {
  @Field(() => String, { name: 'code' })
  private _code: string;

  @Field(() => String, { name: 'name' })
  private _name: string;

  @Field(() => [AddressDto], { name: 'addresses', nullable: true })
  private _addresses: AddressDto[];

  constructor(builder: CustomerDtoBuilder) {
    super(builder);
    if (Boolean(builder)) {
      this._code = builder.code;
      this._name = builder.name;
      this._addresses = builder.addresses;
    }
  }

  public get code(): string {
    return this._code;
  }

  public get name(): string {
    return this._name;
  }

  public get addresses(): AddressDto[] {
    return this._addresses;
  }
}
