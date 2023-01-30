import { ArrayMapper } from '@lib/fdo-utils';
import { Address } from '~/domain';
import { AddressOutput } from '../dtos/customers/address.output';
import { AddressInput } from '../dtos/customers/address.input';

export class AddressMapper extends ArrayMapper<
  AddressOutput,
  AddressInput,
  Address
> {
  constructor() {
    super();
  }

  public toDto(param: Address): AddressOutput {
    return {
      id: param._id?.toString(),
      name: param.name,
      phoneNumber: param.phoneNumber,
      addressLine1: param.addressLine1,
      addressLine2: param.addressLine2,
      city: param.city,
      zipCode: param.zipCode,
      country: param.country,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    };
  }

  public toEntity(param: AddressInput): Address {
    return {
      _id: param.id,
      name: param.name,
      phoneNumber: param.phoneNumber,
      addressLine1: param.addressLine1,
      addressLine2: param.addressLine2,
      city: param.city,
      zipCode: param.zipCode,
      country: param.country,
    };
  }
}
