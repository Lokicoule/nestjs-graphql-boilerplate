import { Address } from '../../../users/domain/entities/address/address.entity';
import { AddressDto } from '../dtos/address.dto';
import { AddressInput } from '../dtos/inputs/address.input';

export class AddressMapper {
  public static toEntity(input: AddressInput): Address {
    if (!Boolean(input)) return;

    return new Address({
      _id: input.id,
      address: input.address,
      city: input.city,
      country: input.country,
      zipCode: input.zipCode,
      additionalAddress: input.additionalAddress,
    });
  }

  public static toDto(address: Address): AddressDto {
    if (!Boolean(address)) return;

    return new AddressDto({
      id: address._id?.toString(),
      address: address.address,
      city: address.city,
      country: address.country,
      zipCode: address.zipCode,
      additionalAddress: address.additionalAddress,
      createdAt: address?.createdAt,
      updatedAt: address?.updatedAt,
    });
  }
}
