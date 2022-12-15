import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { PostDto } from './post.dto';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class UserDto {
  @Field((type) => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [PostDto])
  posts?: PostDto[];
}
