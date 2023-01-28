import { InputType, OmitType } from '@nestjs/graphql';
import { CustomerInput } from '../customer.input';

@InputType()
export class CreateCustomerMutation extends OmitType(CustomerInput, ['id']) {}
