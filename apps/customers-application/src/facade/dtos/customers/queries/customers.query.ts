import { InputType, PickType } from '@nestjs/graphql';
import { CustomerInput } from '../customer.input';

@InputType()
export class CustomersQuery extends PickType(CustomerInput, [
  'id',
  'code',
  'name',
]) {}
