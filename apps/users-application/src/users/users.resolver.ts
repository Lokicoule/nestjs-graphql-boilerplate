/* import { Args, ID, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { UserDto } from './facade/dtos/user.dto';
import { UsersService } from './users.service';

@Resolver((of) => UserDto)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => UserDto)
  getUser(@Args({ name: 'id', type: () => ID }) id: string): UserDto {
    return this.usersService.findById(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }): UserDto {
    return this.usersService.findById(reference.id);
  }
}
 */
