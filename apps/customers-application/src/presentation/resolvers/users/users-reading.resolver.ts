import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import {
  CustomerOutput,
  CustomersManagementFacade,
  SettingOutput,
  SettingsManagementFacade,
  UserOutput,
} from '~/facade';

@Resolver((of) => UserOutput)
export class UsersReadingResolver {
  constructor(
    private readonly customersManagementFacade: CustomersManagementFacade,
    private readonly settingsManagementFacade: SettingsManagementFacade,
  ) {}

  @ResolveField((of) => [CustomerOutput])
  public customers(@Parent() user: UserOutput): Observable<CustomerOutput[]> {
    return this.customersManagementFacade.findCustomers(user.id);
  }

  @ResolveField((of) => [SettingOutput])
  public customersSettings(
    @Parent() user: UserOutput,
  ): Observable<SettingOutput[]> {
    return this.settingsManagementFacade.findSettings(user.id);
  }
}
