import { Field, InputType, PartialType, OmitType } from '@nestjs/graphql';
import { CreateCustomerInput } from './create-customer.input';

@InputType()
export class UpdateCustomerInput extends PartialType(
  OmitType(CreateCustomerInput, ['address']),
) {
  @Field(() => String, { name: 'id' })
  private readonly _id: string;

  constructor(id: string, data: Partial<CreateCustomerInput>) {
    super(data);
    this._id = id;
  }

  public get id(): string {
    return this._id;
  }
}
