import { DtoBuilder } from '@lib/fdo-graphql/dto/dto.builder';
import { OrderItemDto } from './order-item.dto';
import { ProductDto } from '../product/product.dto';

export class OrderItemDtoBuilder extends DtoBuilder {
  private _product: ProductDto;
  private _amount: number;
  private _unitPrice: number;
  private _batchNumber: string;
  private _containerNumber: string;
  private _bestBeforeDate: Date;

  public get product(): ProductDto {
    return this._product;
  }

  public setProduct(value: ProductDto) {
    this._product = value;
    return this;
  }

  public get amount(): number {
    return this._amount;
  }

  public setAmount(value: number) {
    this._amount = value;
    return this;
  }

  public get unitPrice(): number {
    return this._unitPrice;
  }

  public setUnitPrice(value: number) {
    this._unitPrice = value;
    return this;
  }

  public get batchNumber(): string {
    return this._batchNumber;
  }

  public setBatchNumber(value: string) {
    this._batchNumber = value;
    return this;
  }

  public get containerNumber(): string {
    return this._containerNumber;
  }

  public setContainerNumber(value: string) {
    this._containerNumber = value;
    return this;
  }

  public get bestBeforeDate(): Date {
    return this._bestBeforeDate;
  }

  public setBestBeforeDate(value: Date) {
    this._bestBeforeDate = value;
    return this;
  }

  build(): OrderItemDto {
    return new OrderItemDto(this);
  }
}
