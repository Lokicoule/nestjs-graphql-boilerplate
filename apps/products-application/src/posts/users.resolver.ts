import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostDto } from './facade/dtos/post.dto';
import { UserDto } from './facade/dtos/user.dto';
import { PostsService } from './posts.service';

@Resolver((of) => UserDto)
export class UsersResolver {
  constructor(private readonly postsService: PostsService) {}

  @ResolveField((of) => [PostDto])
  public posts(@Parent() user: UserDto): PostDto[] {
    return this.postsService.findAllByAuthorId(user.id);
  }
}
