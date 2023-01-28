import { InputType, PickType } from '@nestjs/graphql';
import { ProductInput } from '../product.input';

@InputType()
export class UpdateProductMutation extends PickType(ProductInput, [
  'id',
  'code',
  'label',
]) {}
