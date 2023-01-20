import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { CustomerDto } from '../customers';
import { SettingDto } from '../settings';

interface IUserDto {
  id: string;
  customers?: CustomerDto[];
  settings?: SettingDto[];
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class UserDto implements IUserDto {
  @Field((type) => ID)
  @Directive('@external')
  public readonly id: string;

  @Field((type) => [CustomerDto])
  public readonly customers?: CustomerDto[];

  @Field((type) => [SettingDto])
  public readonly settings?: SettingDto[];

  constructor(partial: Partial<IUserDto>) {
    Object.assign(this, partial);
  }
}
