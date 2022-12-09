import { DtoModel } from '@lib/fdo-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { AddressDto } from '../address/address.dto';
import { OrderCustomerDtoBuilder } from './customer.dto.builder';

@ObjectType()
export class OrderCustomerDto extends DtoModel {
  @Field(() => String, { name: 'code' })
  private _code: string;

  @Field(() => String, { name: 'name' })
  private _name: string;

  @Field(() => AddressDto, { name: 'deliveryAddress', nullable: true })
  private _deliveryAddress: AddressDto;

  @Field(() => AddressDto, { name: 'invoiceAddress', nullable: true })
  private _invoiceAddress: AddressDto;

  constructor(builder: OrderCustomerDtoBuilder) {
    super(builder);
    this._code = builder.code;
    this._name = builder.name;
    this._deliveryAddress = builder.deliveryAddress;
    this._invoiceAddress = builder.invoiceAddress;
  }

  public get code(): string {
    return this._code;
  }

  public get name(): string {
    return this._name;
  }

  public get deliveryAddress(): AddressDto {
    return this._deliveryAddress;
  }

  public get invoiceAddress(): AddressDto {
    return this._invoiceAddress;
  }
}
