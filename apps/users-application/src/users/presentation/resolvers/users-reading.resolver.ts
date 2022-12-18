import { User } from '@nestjs-cognito/auth';
import { Authentication, CurrentUser } from '@nestjs-cognito/graphql';
import { Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { UserDto } from '../../facade/dtos/user.dto';
import { UsersManagementFacade } from '../../facade/frontoffice/users-management.facade';

@Authentication()
@Resolver(() => UserDto)
export class UsersReadingResolver {
  constructor(private readonly usersManagementFacade: UsersManagementFacade) {}

  @Query(() => UserDto, {
    name: `getAuthenticatedUser`,
    nullable: true,
  })
  findCurrentUser(@CurrentUser() currentUser: User): Observable<UserDto> {
    return this.usersManagementFacade.findUserById(currentUser.username);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: string;
  }): Observable<UserDto> {
    return this.usersManagementFacade.findUserById(reference.id);
  }
}
