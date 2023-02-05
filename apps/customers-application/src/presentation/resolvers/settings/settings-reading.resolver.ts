import { GqlAuthorization, GqlCognitoUser } from '@nestjs-cognito/graphql';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import {
  SettingOutput,
  SettingsManagementFacade,
  SettingsQuery,
  UserOutput,
} from '~/facade';

@GqlAuthorization({
  requiredGroups: ['User'],
})
@Resolver(() => SettingOutput)
export class SettingsReadingResolver {
  constructor(
    private readonly settingsManagementFacade: SettingsManagementFacade,
  ) {}

  @Query(() => [SettingOutput], {
    name: `settings`,
    nullable: true,
  })
  findByCriteria(
    @GqlCognitoUser('username') username: string,
    @Args('criteria', { nullable: true })
    criteria?: SettingsQuery,
  ): Observable<SettingOutput[]> {
    return this.settingsManagementFacade.findSettings(username, criteria);
  }

  @Query(() => SettingOutput, {
    name: `setting`,
    nullable: true,
  })
  findById(
    @GqlCognitoUser('username') username: string,
    @Args('id', { type: () => String }) id: string,
  ): Observable<SettingOutput> {
    return this.settingsManagementFacade.findSettingById(username, id);
  }

  @ResolveField((of) => UserOutput)
  user(@Parent() setting: SettingOutput): any {
    console.log('setting.authorId', setting.authorId);
    return { __typename: 'User', id: setting.authorId };
  }
}
