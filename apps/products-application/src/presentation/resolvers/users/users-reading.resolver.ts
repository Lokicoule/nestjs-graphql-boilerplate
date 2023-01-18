import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { ProductDto } from '~/facade/dtos/products/product.dto';
import { ProductsManagementFacade } from '~/facade/frontoffice/products-management.facade';
import { SettingsManagementFacade } from '~/facade/frontoffice/settings-management.facade';
import { UserDto } from '~/facade/dtos/users/user.dto';
import { SettingDto } from '~/facade/dtos/settings/setting.dto';

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
