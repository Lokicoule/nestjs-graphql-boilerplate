import { OrderCriteria } from '../../../domain/criterias/order/order.criteria';
import { OrderCriteriaBuilder } from '../../../domain/criterias/order/order.criteria.builder';
import { Order } from '../../../domain/entities/order/order.entity';
import { OrderCriteriaInput } from '../../dtos/order/inputs/order-criteria.input';
import { OrderInput } from '../../dtos/order/inputs/order.input';
import { OrderDto } from '../../dtos/order/order.dto';
import { OrderDtoBuilder } from '../../dtos/order/order.dto.builder';
import { CustomerMapper } from '../customer/customer.mapper';
import { OrderItemMapper } from '../order-item/order-item.mapper';

export class OrderMapper {
  /**
   * @method mapCriteriaInputToCriteria
   * @description Maps a OrderCriteriaInput to a OrderCriteria
   * @param {OrderCriteriaInput} orderCriteriaInput - The OrderCriteriaInput to map
   * @returns {OrderCriteria} - The mapped OrderCriteria
   */
  public static mapCriteriaInputToCriteria(
    orderCriteria: OrderCriteriaInput,
  ): OrderCriteria {
    const criteriaBuilder = new OrderCriteriaBuilder()
      .withId(orderCriteria?.id)
      .withCode(orderCriteria?.code)
      .withCustomer(
        orderCriteria?.customer &&
          CustomerMapper.mapCriteriaInputToCriteria(orderCriteria?.customer),
      )
      .withLifeCycle(orderCriteria?.lifeCycle);
    return criteriaBuilder.buildCriteria();
  }

  public static mapToDto(order: Order): OrderDto {
    const orderDto = new OrderDtoBuilder()
      .setId(order?._id?.toString())
      .setCreatedAt(order?.createdAt)
      .setUpdatedAt(order?.updatedAt)
      .setCode(order?.code)
      .setBillingDate(order?.billingDate)
      .setDueDate(order?.dueDate)
      .setCustomer(order?.customer && CustomerMapper.mapToDto(order?.customer))
      .setItems(order?.items && OrderItemMapper.mapListToDtoList(order?.items))
      .setLifeCycle(order?.lifeCycle)
      .build();
    return orderDto;
  }

  public static mapListToDtoList(orders: Order[]): OrderDto[] {
    return orders.map((order) => OrderMapper.mapToDto(order));
  }

  public static mapToEntity(orderDto: OrderDto | Partial<OrderInput>): Order {
    const order = new Order.Builder()
      .setId(orderDto?.id)
      .setCode(orderDto?.code)
      .setBillingDate(orderDto?.billingDate)
      .setDueDate(orderDto?.dueDate)
      .setCustomer(
        orderDto?.customer && CustomerMapper.mapToEntity(orderDto?.customer),
      )
      .setItems(
        orderDto?.items && OrderItemMapper.mapListToEntityList(orderDto?.items),
      )
      .setLifeCycle(orderDto?.lifeCycle)
      .build();

    return order;
  }
}
