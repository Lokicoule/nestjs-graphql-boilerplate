import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import {
  ProductOutput,
  ProductsManagementFacade,
  SettingOutput,
  SettingsManagementFacade,
  UserOutput,
} from '~/facade';

@Resolver((of) => UserOutput)
export class UsersReadingResolver {
  constructor(
    private readonly productsManagementFacade: ProductsManagementFacade,
    private readonly settingsManagementFacade: SettingsManagementFacade,
  ) {}

  @ResolveField((of) => [ProductOutput])
  public products(@Parent() user: UserOutput): Observable<ProductOutput[]> {
    return this.productsManagementFacade.findProducts(user.id);
  }

  @ResolveField((of) => [SettingOutput])
  public settings(@Parent() user: UserOutput): Observable<SettingOutput[]> {
    return this.settingsManagementFacade.findSettings(user.id);
  }
}
