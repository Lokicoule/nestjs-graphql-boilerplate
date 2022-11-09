import { DtoModel } from '@lib/fdo-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { ProductDtoBuilder } from './product.dto.builder';

@ObjectType()
export class ProductDto extends DtoModel {
  @Field(() => String, { name: 'code' })
  private _code: string;

  @Field(() => String, { name: 'label' })
  private _label: string;

  constructor(builder: ProductDtoBuilder) {
    super(builder);
    this._code = builder.code;
    this._label = builder.label;
  }

  public get code(): string {
    return this._code;
  }

  public get label(): string {
    return this._label;
  }
}
