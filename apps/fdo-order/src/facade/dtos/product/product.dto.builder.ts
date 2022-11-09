import { DtoBuilder } from '@lib/fdo-graphql/dto/dto.builder';
import { ProductDto } from './product.dto';

export class ProductDtoBuilder extends DtoBuilder {
  private _code: string;
  private _label: string;

  public get code(): string {
    return this._code;
  }

  public setCode(value: string) {
    this._code = value;
    return this;
  }

  public get label(): string {
    return this._label;
  }

  public setLabel(value: string) {
    this._label = value;
    return this;
  }

  build(): ProductDto {
    return new ProductDto(this);
  }
}
