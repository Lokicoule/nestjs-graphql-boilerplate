import { GqlAuthorization, GqlCognitoUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import {
  CustomersSettingsManagementFacade,
  SettingOutput,
  UpdateCustomerCodeSettingMutation,
} from '~/facade';

@GqlAuthorization({
  requiredGroups: ['User'],
})
@Resolver(() => SettingOutput)
export class CustomerSettingsWritingResolver {
  constructor(
    private readonly customerSettingsManagementFacade: CustomersSettingsManagementFacade,
  ) {}

  @Mutation(() => SettingOutput, { name: `updateCustomerCodeSetting` })
  updateCustomerCodeSetting(
    @GqlCognitoUser('username') username: string,
    @Args('payload')
    payload: UpdateCustomerCodeSettingMutation,
  ): Observable<SettingOutput> {
    return this.customerSettingsManagementFacade.updateSetting(
      username,
      payload,
    );
  }
}
