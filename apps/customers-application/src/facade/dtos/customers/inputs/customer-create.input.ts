import { InputType, OmitType } from '@nestjs/graphql';
import { CustomerInput } from './customer.input';

@InputType()
export class CustomerCreateInput extends OmitType(CustomerInput, ['id']) {}
