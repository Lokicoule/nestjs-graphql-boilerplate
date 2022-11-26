import { Address } from '../../../domain/entities/address/address.entity';
import { User } from '../../../domain/entities/user/user.entity';
import { UserCreateInput } from '../../dtos/user/inputs/user-create.input';
import { UserCriteriaInput } from '../../dtos/user/inputs/user-criteria.input';
import { UserUpdateInput } from '../../dtos/user/inputs/user-update.input';
import { UserDto } from '../../dtos/user/user.dto';
import { UserDtoBuilder } from '../../dtos/user/user.dto.builder';
import { UserMapper } from './user.mapper';
import { Company } from '../../../domain/entities/company/company.entity';
import { AddressDto } from '../../dtos/address/address.dto';
import { AddressDtoBuilder } from '../../dtos/address/address.dto.builder';
import { CompanyDtoBuilder } from '../../dtos/company/company.dto.builder';

describe('UserMapper', () => {
  describe('mapCriteriaInputToCriteria', () => {
    it('should map a UserCriteriaInput to a UserCriteria', () => {
      const userCriteriaInput: UserCriteriaInput = {
        id: 'id',
        email: 'email',
      } as UserCriteriaInput;
      const userCriteria =
        UserMapper.mapCriteriaInputToCriteria(userCriteriaInput);
      expect(userCriteria).toEqual({
        _id: 'id',
        email: 'email',
      });
    });

    it('should map a UserCriteriaInput with undefined values to a clean object without undefined properties', () => {
      const userCriteriaInput: UserCriteriaInput = {
        id: undefined,
        email: 'email',
        phone: null,
      } as UserCriteriaInput;
      const userCriteria =
        UserMapper.mapCriteriaInputToCriteria(userCriteriaInput);
      expect(userCriteria).toEqual({
        email: 'email',
      });
    });
  });

  describe('mapToDto', () => {
    it('successfully maps an entity to a DTO', () => {
      const userEntity: User = new User.Builder()
        .setId(1)
        .setEmail('email')
        .setFirstName('firstName')
        .setLastName('lastName')
        .setPhone('phone')
        .setAddress(new Address.Builder().setId(1).setCity('Paris').build())
        .setCompany(new Company.Builder().setId(1).setName('Amazon').build())
        .build();
      console.log(userEntity);
      const userDto: UserDto = UserMapper.mapToDto(userEntity);
      console.log(userDto);
      expect(JSON.stringify(userDto.id)).toEqual(
        JSON.stringify(userEntity._id),
      );
      expect(userDto.email).toEqual(userEntity.email);
      expect(userDto.firstName).toEqual(userEntity.firstName);
      expect(userDto.lastName).toEqual(userEntity.lastName);
      expect(userDto.phone).toEqual(userEntity.phone);
      expect(userDto.address.city).toEqual(userEntity.address.city);
      expect(userDto.company.name).toEqual(userEntity.company.name);
    });

    it('successfully maps an entity to a DTO with inherited fields and invalid id', () => {
      const sharedDate = new Date();
      const userEntity = new User.Builder()
        .setId('id')
        .setCreatedAt(sharedDate)
        .setUpdatedAt(sharedDate)
        .build();

      const userDto = UserMapper.mapToDto(userEntity);
      expect(userDto.id).toEqual(userEntity._id);
      expect(userDto.id).toBeUndefined();
      expect(userDto.createdAt).toEqual(userEntity.createdAt);
      expect(userDto.updatedAt).toEqual(userEntity.updatedAt);
    });

    it('successfully maps an entity to a DTO with inherited fields and valid id', () => {
      const sharedDate = new Date();
      const userEntity = new User.Builder()
        .setId(1)
        .setCreatedAt(sharedDate)
        .setUpdatedAt(sharedDate)
        .build();

      const userDto = UserMapper.mapToDto(userEntity);
      expect(userDto.id).toEqual(userEntity._id?.toString());
      expect(userDto.createdAt).toEqual(userEntity.createdAt);
      expect(userDto.updatedAt).toEqual(userEntity.updatedAt);
    });
  });

  describe('mapToEntity', () => {
    it('successfully maps a DTO to an entity', () => {
      const userDto: UserDto = new UserDtoBuilder()
        .setId('5e9e9f9b8e7d6a0e6c6f7b6a')
        .setEmail('email')
        .setFirstName('firstName')
        .setLastName('lastName')
        .setPhone('phone')
        .setAddress(new AddressDtoBuilder().setCity('Paris').build())
        .setCompany(new CompanyDtoBuilder().setName('Amazon').build())
        .build();
      const userEntity: User = UserMapper.mapToEntity(userDto);
      expect(JSON.stringify(userEntity._id)).toEqual(
        JSON.stringify(userDto.id),
      );
      expect(userEntity.email).toEqual(userDto.email);
      expect(userEntity.firstName).toEqual(userDto.firstName);
      expect(userEntity.lastName).toEqual(userDto.lastName);
      expect(userEntity.phone).toEqual(userDto.phone);
      expect(userEntity.address.city).toEqual(userDto.address.city);
      expect(userEntity.company.name).toEqual(userDto.company.name);
    });

    it('successfully maps a UserCreateInput to an entity', () => {
      const userInput: UserCreateInput = {
        email: 'email',
        firstName: 'firstName',
        lastName: 'lastName',
      } as UserCreateInput;

      const userEntity = UserMapper.mapToEntity(userInput);
      expect(userEntity.email).toEqual(userInput.email);
      expect(userEntity.firstName).toEqual(userInput.firstName);
      expect(userEntity.lastName).toEqual(userInput.lastName);
    });

    it('successfully maps a UserUpdateInput to an entity', () => {
      const userInput: UserUpdateInput = {
        id: '5e9e9f9b8e7d6a0e6c6f7b6a',
        email: 'email',
        firstName: 'firstName',
      } as UserUpdateInput;

      const userEntity = UserMapper.mapToEntity(userInput);
      expect(JSON.stringify(userEntity._id)).toEqual(
        JSON.stringify(userInput.id),
      );

      expect(userEntity.email).toEqual(userInput.email);
      expect(userEntity.firstName).toEqual(userInput.firstName);
    });
  });
});
