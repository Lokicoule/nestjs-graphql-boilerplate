import { Address } from '../../../domain/entities/address/address.entity';
import { AddressInput } from '../../dtos/address/address.input';
import { AddressDto } from '../../dtos/address/address.dto';
import { AddressDtoBuilder } from '../../dtos/address/address.dto.builder';

/**
 * @class AddressMapper
 * @description Mapper for Address
 */
export class AddressMapper {
  /**
   * @method toDto
   * @description Maps Address to AddressDto
   * @param {Address} address - The Address to map
   * @returns {AddressDto} - The mapped AddressDto
   */
  public static mapToDto(address: Address): AddressDto {
    const addressDto = new AddressDtoBuilder()
      .setId(address._id?.toString())
      .setCreatedAt(address.createdAt)
      .setUpdatedAt(address.updatedAt)
      .setAddress(address.address)
      .setCity(address.city)
      .setAdditionalAddress(address?.additionalAddress)
      .setZipCode(address.zipCode)
      .setCountry(address.country)
      .build();
    return addressDto;
  }

  /**
   * @method mapToEntity
   * @description Maps AddressInput or AddressDto to Address
   * @param {AddressInput | AddressDto} addressDto - The AddressInput or the AddressDto to map
   * @returns {Address} - The mapped Address
   */
  public static mapToEntity(addressDto: AddressInput | AddressDto): Address {
    const address = new Address.Builder()
      .setAddress(addressDto?.address)
      .setCity(addressDto?.city)
      .setAdditionalAddress(addressDto?.additionalAddress)
      .setZipCode(addressDto?.zipCode)
      .setCountry(addressDto?.country)
      .build();
    return address;
  }
}
