import { Args, Query, Resolver } from '@nestjs/graphql';
import { OrderCriteriaInput } from '../../../facade/dtos/order/inputs/order-criteria.input';
import { OrdersManagementFacade } from '../../../facade/frontoffice/orders-management.facade';
import { Observable } from 'rxjs';
import { OrderDto } from '../../../facade/dtos/order/order.dto';

@Resolver(() => OrderDto)
export class OrderReadingResolver {
  constructor(
    private readonly ordersManagementFacade: OrdersManagementFacade,
  ) {}

  @Query(() => [OrderDto], {
    name: `getOrders`,
    nullable: true,
  })
  findByCriteria(
    @Args('criterions', { nullable: true })
    criterions?: OrderCriteriaInput,
  ): Observable<OrderDto[]> {
    return this.ordersManagementFacade.findOrders(criterions);
  }

  @Query(() => OrderDto, {
    name: `getOrder`,
    nullable: true,
  })
  findById(
    @Args('id', { type: () => String }) id: string,
  ): Observable<OrderDto> {
    return this.ordersManagementFacade.findOrderById(id);
  }
}
