import { User } from '@nestjs-cognito/auth';
import { GqlAuthorization, GqlCognitoUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import {
  UpdateProductCodeSettingMutation,
  ProductsSettingsManagementFacade,
  SettingOutput,
} from '~/facade';

@GqlAuthorization({
  requiredGroups: ['User'],
})
@Resolver(() => SettingOutput)
export class ProductSettingsWritingResolver {
  constructor(
    private readonly productSettingsManagementFacade: ProductsSettingsManagementFacade,
  ) {}

  @Mutation(() => SettingOutput, { name: `updateProductCodeSetting` })
  updateProductCodeSetting(
    @GqlCognitoUser('username') username: string,
    @Args('payload')
    payload: UpdateProductCodeSettingMutation,
  ): Observable<SettingOutput> {
    return this.productSettingsManagementFacade.updateSetting(
      username,
      payload,
    );
  }
}
