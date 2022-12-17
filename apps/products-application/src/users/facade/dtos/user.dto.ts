import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { SettingDto } from '../../../settings/facade/dtos/setting.dto';
import { ProductDto } from '../../../products/facade/dtos/product.dto';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class UserDto {
  @Field((type) => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [ProductDto])
  products?: ProductDto[];

  @Field((type) => [SettingDto])
  settings?: ProductDto[];
}
