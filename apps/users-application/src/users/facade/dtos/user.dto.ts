import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class UserDto {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;
}
