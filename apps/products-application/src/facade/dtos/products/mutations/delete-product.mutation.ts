import { InputType, PickType } from '@nestjs/graphql';
import { ProductInput } from '../product.input';

@InputType()
export class DeleteProductMutation extends PickType(ProductInput, ['id']) {}
