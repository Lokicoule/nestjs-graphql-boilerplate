import { Args, Query, Resolver } from '@nestjs/graphql';
import { CustomerDto } from '../../../facade/dtos/inputs/customer.dto';
import { Observable } from 'rxjs';

@Resolver(() => CustomerDto)
export class CustomerReadingResolver {
  @Query(() => [CustomerDto], {
    name: `getCustomers`,
    nullable: true,
  })
  findAll(): Observable<CustomerDto[]> {
    throw new Error('Method not implemented.');
  }

  @Query(() => CustomerDto, {
    name: `getCustomer`,
    nullable: true,
  })
  findById(
    @Args('id', { type: () => String }) id: string,
  ): Observable<CustomerDto> {
    throw new Error('Method not implemented.');
  }
}
