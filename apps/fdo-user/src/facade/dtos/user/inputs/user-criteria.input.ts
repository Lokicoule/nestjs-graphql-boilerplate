import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { UserInput } from './user.input';

@InputType()
export class UserCriteriaInput extends PartialType(
  PickType(UserInput, ['id', 'email']),
) {}
