import { InputType, OmitType } from '@nestjs/graphql';
import { ProductInput } from '../product.input';

@InputType()
export class CreateProductMutation extends OmitType(ProductInput, ['id']) {}
