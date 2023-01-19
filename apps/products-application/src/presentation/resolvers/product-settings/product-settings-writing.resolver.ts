import { User } from '@nestjs-cognito/auth';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import {
  ProductCodeSettingInput,
  ProductsSettingsManagementFacade,
  SettingDto,
} from '~/facade';

@Authorization({
  requiredGroups: ['User'],
})
@Resolver(() => SettingDto)
export class ProductSettingsWritingResolver {
  constructor(
    private readonly productSettingsManagementFacade: ProductsSettingsManagementFacade,
  ) {}

  @Mutation(() => SettingDto, { name: `updateProductCodeSetting` })
  updateProductCodeSetting(
    @CurrentUser() user: User,
    @Args('payload')
    payload: ProductCodeSettingInput,
  ): Observable<SettingDto> {
    return this.productSettingsManagementFacade.updateSetting(
      user.username,
      payload,
    );
  }
}
