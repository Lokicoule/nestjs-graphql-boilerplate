import { DtoModel } from '@lib/fdo-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { ProductInput } from '../product/product.input';
import { OrderItemDtoBuilder } from './order-item.dto.builder';
import { ProductDto } from '../product/product.dto';

@ObjectType()
export class OrderItemDto extends DtoModel {
  @Field(() => ProductDto, { name: 'product', nullable: false })
  private _product: ProductDto;

  @Field(() => Number, { name: 'amount', nullable: false })
  private _amount: number;

  @Field(() => Number, { name: 'unitPrice', nullable: false })
  private _unitPrice: number;

  @Field(() => String, { name: 'batchNumber', nullable: true })
  private _batchNumber: string;

  @Field(() => String, { name: 'containerNumber', nullable: true })
  private _containerNumber: string;

  @Field(() => Date, { name: 'bestBeforeDate', nullable: true })
  private _bestBeforeDate: Date;

  constructor(builder: OrderItemDtoBuilder) {
    super(builder);
    this._product = builder.product;
    this._amount = builder.amount;
    this._unitPrice = builder.unitPrice;
    this._batchNumber = builder.batchNumber;
    this._containerNumber = builder.containerNumber;
    this._bestBeforeDate = builder.bestBeforeDate;
  }

  public get id(): string {
    return this._id;
  }

  public get product(): ProductInput {
    return this._product;
  }

  public get amount(): number {
    return this._amount;
  }

  public get unitPrice(): number {
    return this._unitPrice;
  }

  public get batchNumber(): string {
    return this._batchNumber;
  }

  public get containerNumber(): string {
    return this._containerNumber;
  }

  public get bestBeforeDate(): Date {
    return this._bestBeforeDate;
  }
}
