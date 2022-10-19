import { Args, Query, Resolver } from '@nestjs/graphql';
import { CustomerDto } from '../../../facade/dtos/customer/customer.dto';
import { Observable, of } from 'rxjs';
import { CustomerDtoBuilder } from '../../../facade/dtos/customer/customer.dto.builder';
import { AddressDtoBuilder } from 'apps/fdo-customer/src/facade/dtos/address/address.dto.builder';

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
    return of(
      new CustomerDtoBuilder()
        .setId('id')
        .setCode('123')
        .setName('test')
        .setAddresses([
          new AddressDtoBuilder()
            .setId('id')
            .setCity('Mimizan')
            .setCountry('France')
            .setState('Aquitaine')
            .setStreet('Rue de la plage')
            .setZipCode('40200')
            .build(),
        ])
        .build(),
    );
  }
}
