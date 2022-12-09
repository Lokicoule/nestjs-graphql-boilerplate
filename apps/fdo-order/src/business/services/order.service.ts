import { TechnicalException, UseCaseException } from '@lib/fdo-domain';
import { Injectable } from '@nestjs/common';
import { Observable, throwIfEmpty } from 'rxjs';
import { OrderCriteria } from '../../domain/criterias/order/order.criteria';
import { OrderCriteriaBuilder } from '../../domain/criterias/order/order.criteria.builder';
import { Customer } from '../../domain/entities/customer/customer.entity';
import { OrderItem } from '../../domain/entities/order-item/order-item.entity';
import { Order } from '../../domain/entities/order/order.entity';
import { OrderLifeCycleEnum } from '../../domain/enums/order/order.enum';
import { OrderRepository } from '../../persistence/repositories/order/order.repository';
import { OrderUseCase } from '../use-cases/order.use-case';
import { OrderSettingService } from './order-setting.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderSettingService: OrderSettingService,
  ) {}

  public createOrder(order: Order): Observable<Order> {
    if (!Boolean(order)) {
      throw new TechnicalException('The order is required');
    }
    if (!Boolean(order.code)) {
      return this.orderSettingService.generateOrder(order);
    }
    OrderUseCase.lifeCycleStateTransition(order, OrderLifeCycleEnum.CREATED);

    this.validateOrder(order);
    return this.orderRepository
      .create(order)
      .pipe(throwIfEmpty(() => new TechnicalException('Order not created')));
  }

  public updateOrder(order: Order): Observable<Order> {
    if (!Boolean(order)) {
      throw new TechnicalException('The order is null or undefined');
    }
    if (!Boolean(order._id)) {
      throw new UseCaseException('The order id is required');
    }

    this.validateOrder(order);
    return this.orderRepository.updateById(order._id, order);
  }

  public replaceOrderByCriteria(
    orderCriteria: OrderCriteria,
    order: Order,
  ): Observable<Order> {
    return this.orderRepository.replace(orderCriteria, order);
  }

  public removeOrderById(id: string): Observable<Order> {
    return this.orderRepository.removeById(id);
  }

  public removeOrdersByIds(ids: string[]): Observable<boolean> {
    return this.orderRepository.removeByIds(ids);
  }

  public findOrderById(id: string): Observable<Order> {
    return this.orderRepository.findById(id);
  }

  public findOrders(orderCriteria?: OrderCriteria): Observable<Order[]> {
    return this.orderRepository.find(orderCriteria);
  }

  private validateOrder(order: Order): void {
    const listErrors: string[] = [];

    listErrors.push(...this.validateCustomer(order));
    listErrors.push(...this.validateOrderItems(order));
    if (!Boolean(order.lifeCycle)) {
      listErrors.push('The order life cycle is required');
    }

    if (listErrors.length > 0) {
      throw new UseCaseException(JSON.stringify(listErrors));
    }
  }

  private validateCustomer(order: Order): string[] {
    const listErrors: string[] = [];

    if (!Boolean(order.customer)) {
      listErrors.push('The order customer is required');
    }
    if (!Boolean(order.customer._id)) {
      listErrors.push('The order customer id is required');
    }
    if (!Boolean(order.customer.name)) {
      listErrors.push('The order customer name is required');
    }
    if (!Boolean(order.customer.code)) {
      listErrors.push('The order customer code is required');
    }
    listErrors.push(...this.validateCustomerAddresses(order.customer));
    return listErrors;
  }

  private validateCustomerAddresses(customer: Customer): string[] {
    const listErrors: string[] = [];

    if (!Boolean(customer.deliveryAddress)) {
      listErrors.push('The customer delivery address is required');
    }
    if (!Boolean(customer.invoiceAddress)) {
      listErrors.push('The customer invoice address is required');
    }
    if (!Boolean(customer.deliveryAddress.city)) {
      listErrors.push('The customer delivery address city is required');
    }
    if (!Boolean(customer.invoiceAddress.city)) {
      listErrors.push('The customer invoice address city is required');
    }
    if (!Boolean(customer.deliveryAddress.country)) {
      listErrors.push('The customer delivery address country is required');
    }
    if (!Boolean(customer.invoiceAddress.country)) {
      listErrors.push('The customer invoice address country is required');
    }
    if (!Boolean(customer.deliveryAddress.zipCode)) {
      listErrors.push('The customer delivery address zip code is required');
    }
    if (!Boolean(customer.invoiceAddress.zipCode)) {
      listErrors.push('The customer invoice address zip code is required');
    }

    return listErrors;
  }

  private validateOrderItems(order: Order): string[] {
    const listErrors: string[] = [];

    if (!Boolean(order.items) || order.items.length === 0) {
      listErrors.push('The order items is required');
    }
    order.items.forEach((item: OrderItem) => {
      listErrors.push(...this.validateOrderItem(item));
    });
    return listErrors;
  }

  private validateOrderItem(orderItem: OrderItem): string[] {
    const listErrors: string[] = [];

    if (!Boolean(orderItem)) {
      listErrors.push('The order item is required');
    }
    if (!Boolean(orderItem.amount)) {
      listErrors.push('The order item amount is required');
    }
    if (!Boolean(orderItem.unitPrice)) {
      listErrors.push('The order item unit price is required');
    }
    listErrors.push(...this.validateOrderItemProduct(orderItem));

    return listErrors;
  }

  private validateOrderItemProduct(orderItem: OrderItem): string[] {
    const listErrors: string[] = [];

    if (!Boolean(orderItem.product)) {
      listErrors.push('The order item product is required');
    }
    if (!Boolean(orderItem.product._id)) {
      listErrors.push('The order item product id is required');
    }
    if (!Boolean(orderItem.product.label)) {
      listErrors.push('The order item product label is required');
    }
    if (!Boolean(orderItem.product.code)) {
      listErrors.push('The order item product code is required');
    }

    return listErrors;
  }
}
