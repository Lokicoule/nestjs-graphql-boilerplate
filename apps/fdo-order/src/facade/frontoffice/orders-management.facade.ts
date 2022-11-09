import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { OrderService } from '../../business/services/order.service';
import { OrderDto } from '../dtos/order/order.dto';
import { OrderCreateInput } from '../dtos/order/inputs/order-create.input';
import { OrderCriteriaInput } from '../dtos/order/inputs/order-criteria.input';
import { OrderUpdateInput } from '../dtos/order/inputs/order-update.input';
import { OrderMapper } from '../mapping/order/order.mapper';

@Injectable()
export class OrdersManagementFacade {
  constructor(private readonly orderService: OrderService) {}

  public createOrder(input: OrderCreateInput): Observable<OrderDto> {
    return this.orderService
      .createOrder(OrderMapper.mapToEntity(input))
      .pipe(map(OrderMapper.mapToDto));
  }

  public updateOrder(input: OrderUpdateInput): Observable<OrderDto> {
    return this.orderService
      .updateOrder(OrderMapper.mapToEntity(input))
      .pipe(map(OrderMapper.mapToDto));
  }

  public removeOrderById(orderId: string): Observable<OrderDto> {
    return this.orderService
      .removeOrderById(orderId)
      .pipe(map(OrderMapper.mapToDto));
  }

  public removeOrdersByIds(orderIds: string[]): Observable<boolean> {
    return this.orderService.removeOrdersByIds(orderIds);
  }

  public findOrderById(orderId: string): Observable<OrderDto> {
    return this.orderService
      .findOrderById(orderId)
      .pipe(map(OrderMapper.mapToDto));
  }

  public findOrders(
    orderCriteria?: OrderCriteriaInput,
  ): Observable<OrderDto[]> {
    return this.orderService
      .findOrders(OrderMapper.mapCriteriaInputToCriteria(orderCriteria))
      .pipe(map(OrderMapper.mapListToDtoList));
  }
}
