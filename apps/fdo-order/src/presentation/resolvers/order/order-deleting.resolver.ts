import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OrdersManagementFacade } from '../../../facade/frontoffice/orders-management.facade';
import { Observable } from 'rxjs';
import { OrderDto } from '../../../facade/dtos/order/order.dto';

@Resolver(() => OrderDto)
export class OrderDeletingResolver {
  constructor(
    private readonly ordersManagementFacade: OrdersManagementFacade,
  ) {}

  @Mutation(() => OrderDto, {
    name: `removeOrder`,
  })
  deleteById(
    @Args('id', { type: () => String }) id: string,
  ): Observable<OrderDto> {
    return this.ordersManagementFacade.removeOrderById(id);
  }

  @Mutation(() => Boolean, {
    name: `removeOrders`,
  })
  deleteByIds(
    @Args('ids', { type: () => [String] }) ids: string[],
  ): Observable<boolean> {
    return this.ordersManagementFacade.removeOrdersByIds(ids);
  }
}
