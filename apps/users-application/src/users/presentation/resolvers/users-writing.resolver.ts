import { Authentication, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { User } from '@nestjs-cognito/auth';
import { UsersManagementFacade } from '../../facade/frontoffice/users-management.facade';
import { UserDto } from '../../facade/dtos/user.dto';
import { UserCreateInput } from '../../facade/dtos/inputs/user-create.input';
import { UserUpdateInput } from '../../facade/dtos/inputs/user-update.input';

@Authentication()
@Resolver(() => UserDto)
export class UsersWritingResolver {
  constructor(private readonly usersManagementFacade: UsersManagementFacade) {}

  @Mutation(() => UserDto, { name: `createUser`, nullable: true })
  create(
    @CurrentUser() currentUser: User,
    @Args('createUserInput')
    payload: UserCreateInput,
  ): Observable<UserDto> {
    return this.usersManagementFacade.createUser(payload, currentUser);
  }

  @Mutation(() => UserDto, { name: `updateUser` })
  update(
    @CurrentUser() currentUser: User,
    @Args('updateUserInput')
    payload: UserUpdateInput,
  ): Observable<UserDto> {
    return this.usersManagementFacade.updateUser(payload, currentUser);
  }
}
