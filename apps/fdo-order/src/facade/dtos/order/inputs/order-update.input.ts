import { InputType, PickType } from '@nestjs/graphql';
import { OrderInput } from './order.input';

@InputType()
export class OrderUpdateInput extends PickType(OrderInput, [
  'id',
  'code',
  'billingDate',
  'dueDate',
  'customer',
  'items',
  'lifeCycle',
]) {}
