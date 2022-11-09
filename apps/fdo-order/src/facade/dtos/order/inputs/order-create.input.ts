import { InputType, OmitType } from '@nestjs/graphql';
import { OrderInput } from './order.input';

@InputType()
export class OrderCreateInput extends OmitType(OrderInput, ['id']) {}
