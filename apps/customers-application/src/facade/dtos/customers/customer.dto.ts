import { DtoModel, IDtoModel } from '@lib/fdo-graphql';
import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { UserDto } from '../users';

interface ICustomerDto extends IDtoModel {
  code: string;
  label: string;
  authorId: string;
  user?: UserDto;
}

@ObjectType()
@Directive('@key(fields: "id")')
export class CustomerDto extends DtoModel {
  @Field((type) => String)
  public readonly code: string;

  @Field((type) => String)
  public readonly label: string;

  @Field((type) => String)
  public readonly authorId: string;

  @Field((type) => UserDto)
  public readonly user?: UserDto;

  constructor(data: ICustomerDto) {
    super(data);
    this.code = data.code;
    this.label = data.label;
    this.authorId = data.authorId;
    this.user = data.user;
  }
}
