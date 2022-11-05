import { InputType, OmitType } from '@nestjs/graphql';
import { ProductInput } from './product.input';

@InputType()
export class ProductCreateInput extends OmitType(ProductInput, ['id']) {}
