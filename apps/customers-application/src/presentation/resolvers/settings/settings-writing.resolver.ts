import { GqlAuthorization, GqlCognitoUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import {
  SettingOutput,
  SettingsManagementFacade,
  UpdateSettingMutation,
} from '~/facade';

@GqlAuthorization({
  requiredGroups: ['User'],
})
@Resolver(() => SettingOutput)
export class SettingsWritingResolver {
  constructor(
    private readonly settingsManagementFacade: SettingsManagementFacade,
  ) {}

  @Mutation(() => SettingOutput, { name: `updateSetting` })
  update(
    @GqlCognitoUser('username') username: string,
    @Args('payload')
    payload: UpdateSettingMutation,
  ): Observable<SettingOutput> {
    return this.settingsManagementFacade.updateSetting(username, payload);
  }
}
