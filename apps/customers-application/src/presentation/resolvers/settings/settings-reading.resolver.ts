import { User } from '@nestjs-cognito/auth';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import {
  SettingsQuery,
  SettingOutput,
  SettingsManagementFacade,
  UserOutput,
} from '~/facade';

@Authorization({
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
    @CurrentUser() user: User,
    @Args('criteria', { nullable: true })
    criteria?: SettingsQuery,
  ): Observable<SettingOutput[]> {
    return this.settingsManagementFacade.findSettings(user.username, criteria);
  }

  @Query(() => SettingOutput, {
    name: `setting`,
    nullable: true,
  })
  findById(
    @CurrentUser() user: User,
    @Args('id', { type: () => String }) id: string,
  ): Observable<SettingOutput> {
    return this.settingsManagementFacade.findSettingById(user.username, id);
  }

  @ResolveField((of) => UserOutput)
  user(@Parent() setting: SettingOutput): any {
    console.log('setting.authorId', setting.authorId);
    return { __typename: 'User', id: setting.authorId };
  }
}
