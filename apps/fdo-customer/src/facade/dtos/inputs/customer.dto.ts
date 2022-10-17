import { Dto, DtoProps } from '@lib/fdo-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { AddressDto } from './address.dto';

type CustomerDtoProps = {
  code: string;
  name: string;
  addresses: AddressDto[];
} & DtoProps;

@ObjectType()
export class CustomerDto extends Dto {
  @Field(() => String, { name: 'code' })
  private _code: string;

  @Field(() => String, { name: 'name' })
  private _name: string;

  @Field(() => [AddressDto], { name: 'addresses', nullable: true })
  private _addresses: AddressDto[];

  constructor(props: CustomerDtoProps) {
    super(props);
    const { code, name, addresses } = props;
    this._code = code;
    this._name = name;
    this._addresses = addresses;
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
