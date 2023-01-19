import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import {
  ProductDto,
  ProductsManagementFacade,
  SettingDto,
  SettingsManagementFacade,
  UserDto,
} from '~/facade';

@Resolver((of) => UserDto)
export class UsersReadingResolver {
  constructor(
    private readonly productsManagementFacade: ProductsManagementFacade,
    private readonly settingsManagementFacade: SettingsManagementFacade,
  ) {}

  @ResolveField((of) => [ProductDto])
  public products(@Parent() user: UserDto): Observable<ProductDto[]> {
    return this.productsManagementFacade.findProducts(user.id);
  }

  @ResolveField((of) => [SettingDto])
  public settings(@Parent() user: UserDto): Observable<SettingDto[]> {
    return this.settingsManagementFacade.findSettings(user.id);
  }
}
