import { User } from '@nestjs-cognito/auth';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import {
  SettingOutput,
  SettingsManagementFacade,
  UpdateSettingMutation,
} from '~/facade';

@Authorization({
  requiredGroups: ['User'],
})
@Resolver(() => SettingOutput)
export class SettingsWritingResolver {
  constructor(
    private readonly settingsManagementFacade: SettingsManagementFacade,
  ) {}

  @Mutation(() => SettingOutput, { name: `updateSetting` })
  update(
    @CurrentUser() user: User,
    @Args('payload')
    payload: UpdateSettingMutation,
  ): Observable<SettingOutput> {
    return this.settingsManagementFacade.updateSetting(user.username, payload);
  }
}
