import { OrderItem } from '../../../domain/entities/order-item/order-item.entity';
import { OrderItemDto } from '../../dtos/order-item/order-item.dto';
import { OrderItemDtoBuilder } from '../../dtos/order-item/order-item.dto.builder';
import { OrderItemInput } from '../../dtos/order-item/order-item.input';
import { ProductMapper } from '../product/product.mapper';

export class OrderItemMapper {
  public static mapToDto(orderItem: OrderItem): OrderItemDto {
    const orderItemDto = new OrderItemDtoBuilder()
      .setId(orderItem?._id?.toString())
      .setCreatedAt(orderItem?.createdAt)
      .setUpdatedAt(orderItem?.updatedAt)
      .setAmount(orderItem?.amount)
      .setBatchNumber(orderItem?.batchNumber)
      .setBestBeforeDate(orderItem?.bestBeforeDate)
      .setContainerNumber(orderItem?.containerNumber)
      .setUnitPrice(orderItem?.unitPrice)
      .setProduct(ProductMapper.mapToDto(orderItem?.product))
      .build();
    return orderItemDto;
  }

  public static mapListToDtoList(orderItemList: OrderItem[]): OrderItemDto[] {
    return orderItemList?.map((item) => OrderItemMapper.mapToDto(item));
  }

  public static mapToEntity(
    orderItemDto: OrderItemDto | Partial<OrderItemInput>,
  ): OrderItem {
    const orderItem = new OrderItem.Builder()
      .setId(orderItemDto?.id)
      .setAmount(orderItemDto?.amount)
      .setBatchNumber(orderItemDto?.batchNumber)
      .setBestBeforeDate(orderItemDto?.bestBeforeDate)
      .setContainerNumber(orderItemDto?.containerNumber)
      .setUnitPrice(orderItemDto?.unitPrice)
      .setProduct(ProductMapper.mapToEntity(orderItemDto?.product))
      .build();

    return orderItem;
  }

  public static mapListToEntityList(
    orderItemDtoList: OrderItemDto[] | Partial<OrderItemInput>[],
  ): OrderItem[] {
    return orderItemDtoList?.map((item) => OrderItemMapper.mapToEntity(item));
  }
}
