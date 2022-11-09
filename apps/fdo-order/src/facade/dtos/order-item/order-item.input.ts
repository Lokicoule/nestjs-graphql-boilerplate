import { Field, InputType } from '@nestjs/graphql';
import { ProductInput } from '../product/product.input';

@InputType()
export class OrderItemInput {
  @Field(() => String, { name: 'id', nullable: true })
  public readonly id: string;

  @Field(() => ProductInput, { name: 'product', nullable: false })
  public readonly product: ProductInput;

  @Field(() => Number, { name: 'amount', nullable: false })
  public readonly amount: number;

  @Field(() => Number, { name: 'unitPrice', nullable: false })
  public readonly unitPrice: number;

  @Field(() => String, { name: 'batchNumber', nullable: true })
  public readonly batchNumber: string;

  @Field(() => String, { name: 'containerNumber', nullable: true })
  public readonly containerNumber: string;

  @Field(() => Date, { name: 'bestBeforeDate', nullable: true })
  public readonly bestBeforeDate: Date;
}
