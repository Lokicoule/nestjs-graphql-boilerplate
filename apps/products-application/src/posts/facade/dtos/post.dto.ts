import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { UserDto } from './user.dto';

@ObjectType()
@Directive('@key(fields: "id")')
export class PostDto {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field((type) => Int)
  authorId: number;

  @Field((type) => UserDto)
  user?: UserDto;
}
