import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { ProductInput } from './product.input';

@InputType()
export class ProductCriteriaInput extends PartialType(
  PickType(ProductInput, ['id', 'code', 'label']),
) {}
