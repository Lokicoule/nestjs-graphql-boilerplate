import { InputType, PickType } from '@nestjs/graphql';
import { CustomerInput } from '../customer.input';

@InputType()
export class UpdateCustomerMutation extends PickType(CustomerInput, [
  'id',
  'code',
  'name',
  'email',
  'phone',
  'addresses',
]) {}
