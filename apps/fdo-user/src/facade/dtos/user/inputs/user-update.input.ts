import { InputType, PickType } from '@nestjs/graphql';
import { UserInput } from './user.input';

@InputType()
export class UserUpdateInput extends PickType(UserInput, [
  'id',
  'firstName',
  'lastName',
  'email',
  'phone',
  'address',
  'company',
]) {}
