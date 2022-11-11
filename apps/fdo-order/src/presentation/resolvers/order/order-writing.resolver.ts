import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OrderCreateInput } from '../../../facade/dtos/order/inputs/order-create.input';
import { OrderUpdateInput } from '../../../facade/dtos/order/inputs/order-update.input';
import { Observable } from 'rxjs';
import { OrderDto } from '../../../facade/dtos/order/order.dto';
import { OrdersManagementFacade } from '../../../facade/frontoffice/orders-management.facade';
import { OrderCriteriaInput } from 'apps/fdo-order/src/facade/dtos/order/inputs/order-criteria.input';

@Resolver(() => OrderDto)
export class OrderWritingResolver {
  constructor(
    private readonly ordersManagementFacade: OrdersManagementFacade,
  ) {}

  @Mutation(() => OrderDto, { name: `createOrder`, nullable: true })
  create(
    @Args('createOrderInput')
    payload: OrderCreateInput,
  ): Observable<OrderDto> {
    return this.ordersManagementFacade.createOrder(payload);
  }

  @Mutation(() => OrderDto, { name: `updateOrder` })
  update(
    @Args('updateOrderInput')
    payload: OrderUpdateInput,
  ): Observable<OrderDto> {
    return this.ordersManagementFacade.updateOrder(payload);
  }
}
