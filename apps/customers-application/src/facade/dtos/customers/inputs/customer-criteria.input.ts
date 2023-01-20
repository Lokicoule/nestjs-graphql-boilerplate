import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { CustomerInput } from './customer.input';

@InputType()
export class CustomerCriteriaInput extends PartialType(
  PickType(CustomerInput, ['id', 'code', 'label']),
) {}
