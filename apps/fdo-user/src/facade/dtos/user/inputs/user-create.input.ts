import { InputType, OmitType } from '@nestjs/graphql';
import { UserInput } from './user.input';

@InputType()
export class UserCreateInput extends OmitType(UserInput, ['id']) {}
