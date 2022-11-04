import { InputType, PickType } from '@nestjs/graphql';
import { CustomerInput } from './customer.input';

@InputType()
export class CustomerUpdateInput extends PickType(CustomerInput, [
  'id',
  'code',
  'name',
  'addresses',
]) {}
