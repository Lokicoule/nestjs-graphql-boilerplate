import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CustomerDto } from '../../../facade/dtos/inputs/customer.dto';
import { Observable } from 'rxjs';

@Resolver(() => CustomerDto)
export class CustomerDeletingResolver {
  @Mutation(() => CustomerDto, {
    name: `removeCustomer`,
  })
  deleteById(
    @Args('id', { type: () => String }) id: string,
  ): Observable<CustomerDto> {
    throw new Error('Method not implemented.');
  }

  @Mutation(() => Boolean, {
    name: `removeCustomers`,
  })
  deleteByIds(
    @Args('ids', { type: () => [String] }) ids: string[],
  ): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
