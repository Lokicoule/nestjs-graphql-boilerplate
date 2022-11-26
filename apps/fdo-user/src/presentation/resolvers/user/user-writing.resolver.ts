import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserCreateInput } from '../../../facade/dtos/user/inputs/user-create.input';
import { UserUpdateInput } from '../../../facade/dtos/user/inputs/user-update.input';
import { Observable } from 'rxjs';
import { UserDto } from '../../../facade/dtos/user/user.dto';
import { UsersManagementFacade } from '../../../facade/frontoffice/users-management.facade';

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
}
