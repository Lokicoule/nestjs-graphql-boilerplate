import { InputType, PickType } from '@nestjs/graphql';
import { ProductInput } from './product.input';

@InputType()
export class ProductUpdateInput extends PickType(ProductInput, [
  'id',
  'code',
  'label',
]) {}
