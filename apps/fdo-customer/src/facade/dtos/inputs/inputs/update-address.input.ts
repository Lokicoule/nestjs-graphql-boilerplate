import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateAddressInput } from './create-address.input';

@InputType()
export class UpdateAddressInput extends PartialType(CreateAddressInput) {
  @Field(() => String, { name: 'id' })
  private readonly _id: string;

  constructor(id: string, data: Partial<CreateAddressInput>) {
    super(data);
    this._id = id;
  }

  public get id(): string {
    return this._id;
  }
}
