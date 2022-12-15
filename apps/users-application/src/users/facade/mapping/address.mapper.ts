import { Address } from '../../../users/domain/entities/address/address.entity';
import { AddressDto } from '../dtos/address.dto';
import { AddressInput } from '../dtos/inputs/address.input';

export class AddressMapper {
  public static toEntity(input: AddressInput): Address {
    const { id, ...addressWithoutId } = input;

    const address: Address = Object.assign({} as Address, {
      ...addressWithoutId,
      _id: id,
    });

    return new Address(address);
  }

  public static toDto(address: Address): AddressDto {
    const { _id, ...addressWithoutId } = address;

    const addressDto: AddressDto = Object.assign({} as AddressDto, {
      ...addressWithoutId,
      id: _id?.toString(),
    });

    return new AddressDto(addressDto);
  }
}
