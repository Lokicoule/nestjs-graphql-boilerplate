import { User } from '@nestjs-cognito/auth';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { UsersService } from '../../business/services/users.service';
import { UserCreateInput } from '../dtos/inputs/user-create.input';
import { UserUpdateInput } from '../dtos/inputs/user-update.input';
import { UserDto } from '../dtos/user.dto';
import { UserMapper } from '../mapping/user.mapper';

@Injectable()
export class UsersManagementFacade {
  constructor(private readonly usersService: UsersService) {}

  public createUser(
    input: UserCreateInput,
    cognitoUser: User,
  ): Observable<UserDto> {
    const user = UserMapper.toEntity(input);
    user._id = cognitoUser.username;

    return this.usersService.createUser(user).pipe(map(UserMapper.toDto));
  }

  /**
   * @description Update a user and return the updated user
   * replace the user id by the cognito username to avoid any security issue
   * @param input UserUpdateInput
   * @param cognitoUser User
   * @returns Observable<UserDto>
   */
  public updateUser(
    input: UserUpdateInput,
    cognitoUser: User,
  ): Observable<UserDto> {
    const user = UserMapper.toEntity(input);
    user._id = cognitoUser.username;

    return this.usersService.updateUser(user).pipe(map(UserMapper.toDto));
  }

  public findUserById(userId: string): Observable<UserDto> {
    return this.usersService.findUserById(userId).pipe(map(UserMapper.toDto));
  }
}
