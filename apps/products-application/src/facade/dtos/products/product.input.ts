import { BaseInput, IBaseInput } from '@lib/fdo-graphql';
import { Field, InputType } from '@nestjs/graphql';

export interface IProductInput extends IBaseInput {
  code: string;
  label: string;
}

@InputType()
export class ProductInput extends BaseInput implements IProductInput {
  @Field(() => String, { name: 'code', nullable: true })
  public readonly code: string;

  @Field(() => String, { name: 'label' })
  public readonly label: string;

  constructor(data: IProductInput) {
    super(data);
    this.code = data?.code;
    this.label = data?.label;
  }
}
