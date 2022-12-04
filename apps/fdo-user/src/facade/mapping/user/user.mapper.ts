import { UserCriteria } from '../../../domain/criterias/user/user.criteria';
import { UserCriteriaBuilder } from '../../../domain/criterias/user/user.criteria.builder';
import { User } from '../../../domain/entities/user/user.entity';
import { UserCriteriaInput } from '../../dtos/user/inputs/user-criteria.input';
import { UserInput } from '../../dtos/user/inputs/user.input';
import { UserDto } from '../../dtos/user/user.dto';
import { UserDtoBuilder } from '../../dtos/user/user.dto.builder';
import { AddressMapper } from '../address/address.mapper';
import { CompanyMapper } from '../company/company.mapper';
import { User as CognitoUser } from '@nestjs-cognito/auth';

/**
 * @class UserMapper
 * @description Mapper for User
 */
export class UserMapper {
  /**
   * @method mapCriteriaInputToCriteria
   * @description Maps a UserCriteriaInput to a UserCriteria
   * @param {UserCriteriaInput} userCriteriaInput - The UserCriteriaInput to map
   * @returns {UserCriteria} - The mapped UserCriteria
   */
  public static mapCriteriaInputToCriteria(
    userCriteria: UserCriteriaInput,
  ): UserCriteria {
    const criteriaBuilder = new UserCriteriaBuilder()
      .withId(userCriteria?.id)
      .withEmail(userCriteria?.email);
    return criteriaBuilder.buildCriteria();
  }

  /**
   * @method mapToDto
   * @description Maps a User to a UserDto
   * @param {User} user - The User to map
   * @returns {UserDto} - The mapped UserDto
   */
  public static mapToDto(user: User): UserDto {
    const userDto = new UserDtoBuilder()
      .setId(user._id?.toString())
      .setCreatedAt(user.createdAt)
      .setUpdatedAt(user.updatedAt)
      .setFirstName(user.firstName)
      .setLastName(user.lastName)
      .setEmail(user.email)
      .setPhone(user.phone)
      .setAddress(user.address && AddressMapper.mapToDto(user.address))
      .setCompany(user.company && CompanyMapper.mapToDto(user.company))
      .build();
    return userDto;
  }

  /**
   * @method mapListToDtoList
   * @description Maps a list of Users to a list of UserDtos
   * @param {User[]} users - The list of Users to map
   * @returns {UserDto[]} - The mapped list of UserDtos
   */
  public static mapListToDtoList(users: User[]): UserDto[] {
    return users.map((user) => UserMapper.mapToDto(user));
  }

  /**
   * @method mapToEntity
   * @description Maps a UserDto to a User
   * @param {UserDto | UserInput} userDto - The UserDto or the UserInput to map
   * @param {CognitoUser} cognitoUser - The authenticated user to map
   * @returns {User} - The mapped User
   */
  public static mapToEntity(
    userDto: UserDto | Partial<UserInput>,
    cognitoUser?: CognitoUser,
  ): User {
    const user = new User.Builder()
      .setId(userDto?.id)
      .setCognitoId(cognitoUser?.username)
      .setFirstName(userDto?.firstName)
      .setLastName(userDto?.lastName)
      .setEmail(userDto?.email)
      .setPhone(userDto?.phone)
      .setAddress(AddressMapper.mapToEntity(userDto?.address))
      .setCompany(CompanyMapper.mapToEntity(userDto?.company))
      .build();
    return user;
  }
}
