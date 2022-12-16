import { IUser, User } from '../../domain/entities/user/user.entity';
import { UserDto } from '../dtos/user.dto';
import { UserInput } from '../dtos/inputs/user.input';
import { CompanyMapper } from './company.mapper';
import { AddressMapper } from './address.mapper';

export class UserMapper {
  public static toDto(user: User): UserDto {
    const { _id, company, address, ...baseUser } = user;

    const userDto: UserDto = Object.assign({} as UserDto, {
      ...baseUser,
      id: _id?.toString(),
      company: CompanyMapper.toDto(company),
      address: AddressMapper.toDto(address),
    });

    return new UserDto(userDto);
  }

  public static toEntity(user: Partial<UserInput>): User {
    const { id, company, address, ...baseUser } = user;

    const userEntity: IUser = Object.assign({} as IUser, {
      ...baseUser,
      _id: id,
      company: CompanyMapper.toEntity(company),
      address: AddressMapper.toEntity(address),
    });

    return new User(userEntity);
  }
}
