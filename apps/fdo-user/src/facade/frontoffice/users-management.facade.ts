import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { UserService } from '../../business/services/user.service';
import { UserDto } from '../dtos/user/user.dto';
import { UserCreateInput } from '../dtos/user/inputs/user-create.input';
import { UserCriteriaInput } from '../dtos/user/inputs/user-criteria.input';
import { UserUpdateInput } from '../dtos/user/inputs/user-update.input';
import { UserMapper } from '../mapping/user/user.mapper';

@Injectable()
export class UsersManagementFacade {
  constructor(private readonly userService: UserService) {}

  public createUser(input: UserCreateInput): Observable<UserDto> {
    return this.userService
      .createUser(UserMapper.mapToEntity(input))
      .pipe(map(UserMapper.mapToDto));
  }

  public updateUser(input: UserUpdateInput): Observable<UserDto> {
    return this.userService
      .updateUser(UserMapper.mapToEntity(input))
      .pipe(map(UserMapper.mapToDto));
  }

  public findUserById(userId: string): Observable<UserDto> {
    return this.userService.findUserById(userId).pipe(map(UserMapper.mapToDto));
  }

  public findUser(userCriteria: UserCriteriaInput): Observable<UserDto> {
    return this.userService
      .findUser(UserMapper.mapCriteriaInputToCriteria(userCriteria))
      .pipe(map(UserMapper.mapToDto));
  }

  public findUsers(userCriteria?: UserCriteriaInput): Observable<UserDto[]> {
    return this.userService
      .findUsers(UserMapper.mapCriteriaInputToCriteria(userCriteria))
      .pipe(map(UserMapper.mapListToDtoList));
  }
}
