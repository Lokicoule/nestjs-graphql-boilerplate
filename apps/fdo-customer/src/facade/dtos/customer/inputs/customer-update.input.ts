import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CustomerCreateInput } from './customer-create.input';

@InputType()
export class CustomerUpdateInput extends PartialType(CustomerCreateInput) {
  @Field(() => String, { name: 'id' })
  private readonly _id: string;

  public get id(): string {
    return this._id;
  }
}
