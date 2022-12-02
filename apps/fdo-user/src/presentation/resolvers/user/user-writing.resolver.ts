import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserCreateInput } from '../../../facade/dtos/user/inputs/user-create.input';
import { UserUpdateInput } from '../../../facade/dtos/user/inputs/user-update.input';
import { Observable } from 'rxjs';
import { UserDto } from '../../../facade/dtos/user/user.dto';
import { UsersManagementFacade } from '../../../facade/frontoffice/users-management.facade';
import { Authentication } from '@nestjs-cognito/graphql';

@Authentication()
@Resolver(() => UserDto)
export class UserWritingResolver {
  constructor(private readonly usersManagementFacade: UsersManagementFacade) {}

  @Mutation(() => UserDto, { name: `createUser`, nullable: true })
  create(
    @Args('createUserInput')
    payload: UserCreateInput,
  ): Observable<UserDto> {
    return this.usersManagementFacade.createUser(payload);
  }

  @Mutation(() => UserDto, { name: `updateUser` })
  update(
    @Args('updateUserInput')
    payload: UserUpdateInput,
  ): Observable<UserDto> {
    return this.usersManagementFacade.updateUser(payload);
  }

  @Mutation(() => UserDto, { name: `replaceUser` })
  replace(
    @Args('replaceUserInput')
    payload: UserUpdateInput,
  ): Observable<UserDto> {
    return this.usersManagementFacade.replaceUser(payload);
  }
}