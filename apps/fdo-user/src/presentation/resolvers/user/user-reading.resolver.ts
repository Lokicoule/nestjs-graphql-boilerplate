import { Authentication } from '@nestjs-cognito/graphql';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { UserCriteriaInput } from '../../../facade/dtos/user/inputs/user-criteria.input';
import { UserDto } from '../../../facade/dtos/user/user.dto';
import { UsersManagementFacade } from '../../../facade/frontoffice/users-management.facade';

@Authentication()
@Resolver(() => UserDto)
export class UserReadingResolver {
  constructor(private readonly usersManagementFacade: UsersManagementFacade) {}

  @Query(() => [UserDto], {
    name: `getUsers`,
    nullable: true,
  })
  findUsersByCriteria(
    @Args('criterions', { nullable: true })
    criterions?: UserCriteriaInput,
  ): Observable<UserDto[]> {
    return this.usersManagementFacade.findUsers(criterions);
  }

  @Query(() => UserDto, {
    name: `getUserById`,
    nullable: true,
  })
  findUserById(
    @Args('id', { type: () => String }) id: string,
  ): Observable<UserDto> {
    return this.usersManagementFacade.findUserById(id);
  }

  @Query(() => UserDto, {
    name: `getUser`,
    nullable: true,
  })
  findUserByCriteria(
    @Args('criterions', { nullable: true })
    criterions?: UserCriteriaInput,
  ): Observable<UserDto> {
    return this.usersManagementFacade.findUser(criterions);
  }
}