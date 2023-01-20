import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import {
  CustomerDto,
  CustomersManagementFacade,
  SettingDto,
  SettingsManagementFacade,
  UserDto,
} from '~/facade';

@Resolver((of) => UserDto)
export class UsersReadingResolver {
  constructor(
    private readonly customersManagementFacade: CustomersManagementFacade,
    private readonly settingsManagementFacade: SettingsManagementFacade,
  ) {}

  @ResolveField((of) => [CustomerDto])
  public customers(@Parent() user: UserDto): Observable<CustomerDto[]> {
    return this.customersManagementFacade.findCustomers(user.id);
  }

  @ResolveField((of) => [SettingDto])
  public settings(@Parent() user: UserDto): Observable<SettingDto[]> {
    return this.settingsManagementFacade.findSettings(user.id);
  }
}
