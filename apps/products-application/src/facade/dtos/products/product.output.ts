import { BaseOutput, IBaseOutput } from '@lib/fdo-graphql';
import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { UserOutput } from '../users';

interface IProductOutput extends IBaseOutput {
  code: string;
  label: string;
  authorId: string;
  user?: UserOutput;
}

@ObjectType()
@Directive('@key(fields: "id")')
export class ProductOutput extends BaseOutput implements IProductOutput {
  @Field((type) => String)
  public readonly code: string;

  @Field((type) => String)
  public readonly label: string;

  @Field((type) => String)
  public readonly authorId: string;

  @Field((type) => UserOutput)
  public readonly user?: UserOutput;

  constructor(data: IProductOutput) {
    super(data);
    this.code = data?.code;
    this.label = data?.label;
    this.authorId = data?.authorId;
    this.user = data?.user;
  }
}
