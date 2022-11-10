import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { OrderInput } from './order.input';

@InputType()
export class OrderCriteriaInput extends PartialType(
  PickType(OrderInput, ['id', 'code', 'customer', 'lifeCycle']),
) {}
