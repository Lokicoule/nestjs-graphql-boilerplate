import { User } from '@nestjs-cognito/auth';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { SettingCriteriaInput } from '../../facade/dtos/inputs/setting-criteria.input';
import { SettingDto } from '../../facade/dtos/setting.dto';
import { SettingsManagementFacade } from '../../facade/frontoffice/settings-management.facade';
import { UserDto } from '../../../users/facade/dtos/user.dto';

@Authorization({
  requiredGroups: ['User'],
})
@Resolver(() => SettingDto)
export class SettingReadingResolver {
  constructor(
    private readonly settingsManagementFacade: SettingsManagementFacade,
  ) {}

  @Query(() => [SettingDto], {
    name: `getSettings`,
    nullable: true,
  })
  findByCriteria(
    @CurrentUser() user: User,
    @Args('criterias', { nullable: true })
    criterias?: SettingCriteriaInput,
  ): Observable<SettingDto[]> {
    return this.settingsManagementFacade.findSettingsByAuthorId(
      user.username,
      criterias,
    );
  }

  @Query(() => SettingDto, {
    name: `getSetting`,
    nullable: true,
  })
  findById(
    @CurrentUser() user: User,
    @Args('id', { type: () => String }) id: string,
  ): Observable<SettingDto> {
    return this.settingsManagementFacade.findSettingByIdAndAuthorId(
      user.username,
      id,
    );
  }

  @ResolveField((of) => UserDto)
  user(@Parent() setting: SettingDto): any {
    return { __typename: 'User', id: setting.authorId };
  }
}
