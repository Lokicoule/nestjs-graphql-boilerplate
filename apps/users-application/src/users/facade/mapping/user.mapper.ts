import { User } from '../../domain/entities/user/user.entity';
import { UserInput } from '../dtos/inputs/user.input';
import { UserDto } from '../dtos/user.dto';
import { AddressMapper } from './address.mapper';
import { CompanyMapper } from './company.mapper';

export class UserMapper {
  public static toDto(user: User): UserDto {
    if (!Boolean(user)) return;

    return new UserDto({
      id: user._id?.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: AddressMapper.toDto(user.address),
      company: CompanyMapper.toDto(user.company),
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    });
  }

  public static toEntity(user: Partial<UserInput>): User {
    if (!Boolean(user)) return;

    return new User({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: AddressMapper.toEntity(user.address),
      company: CompanyMapper.toEntity(user.company),
    });
  }
}
