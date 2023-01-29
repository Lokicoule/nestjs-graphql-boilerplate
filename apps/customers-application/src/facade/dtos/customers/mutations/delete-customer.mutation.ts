import { InputType, PickType } from '@nestjs/graphql';
import { CustomerInput } from '../customer.input';

@InputType()
export class DeleteCustomerMutation extends PickType(CustomerInput, ['id']) {}
