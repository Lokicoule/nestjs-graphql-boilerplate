import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { ParseIntPipe } from '@nestjs/common';
import { PostDto } from './facade/dtos/post.dto';
import { UserDto } from './facade/dtos/user.dto';

@Resolver((of) => PostDto)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query((returns) => PostDto)
  post(
    @Args({ name: 'id', type: () => ID }, ParseIntPipe) id: number,
  ): PostDto {
    return this.postsService.findOne(id);
  }

  @Query((returns) => [PostDto])
  posts(): PostDto[] {
    return this.postsService.findAll();
  }

  @ResolveField((of) => UserDto)
  user(@Parent() post: PostDto): any {
    return { __typename: 'User', id: post.authorId };
  }
}
