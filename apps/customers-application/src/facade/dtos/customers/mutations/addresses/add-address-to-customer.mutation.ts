import { InputType, PickType } from '@nestjs/graphql';
import { CustomerInput } from '../../customer.input';

@InputType()
export class AddAddressToCustomerMutation extends PickType(CustomerInput, [
  'id',
  'address',
]) {}
