import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { SettingDto } from '../../../settings/facade/dtos/setting.dto';
import { ProductDto } from '../../../products/facade/dtos/product.dto';

interface IUserDto {
  id: string;
  products?: ProductDto[];
  settings?: SettingDto[];
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class UserDto implements IUserDto {
  @Field((type) => ID)
  @Directive('@external')
  public readonly id: string;

  @Field((type) => [ProductDto])
  public readonly products?: ProductDto[];

  @Field((type) => [SettingDto])
  public readonly settings?: SettingDto[];

  constructor(partial: Partial<IUserDto>) {
    Object.assign(this, partial);
  }
}
