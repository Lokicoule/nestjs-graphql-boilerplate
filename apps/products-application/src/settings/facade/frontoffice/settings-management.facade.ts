import { User } from '@nestjs-cognito/auth';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../../../users/facade/dtos/user.dto';
import { map, Observable } from 'rxjs';
import { SettingsService } from '../../business/services/settings.service';
import { SettingCriteriaInput } from '../dtos/inputs/setting-criteria.input';
import { SettingInput } from '../dtos/inputs/setting.input';
import { SettingDto } from '../dtos/setting.dto';
import { SettingMapper } from '../mapping/setting.mapper';

@Injectable()
export class SettingsManagementFacade {
  constructor(private readonly settingsService: SettingsService) {}

  public updateSetting(
    cognitoUser: User,
    input: SettingInput,
  ): Observable<SettingDto> {
    return this.settingsService
      .updateSetting(
        SettingMapper.toEntity({ ...input, authorId: cognitoUser.username }),
      )
      .pipe(map(SettingMapper.toDto));
  }

  public findSettingById(
    cognitoUser: User,
    settingId: string,
  ): Observable<SettingDto> {
    return this.settingsService
      .findSetting({
        _id: settingId,
        authorId: cognitoUser.username,
      })
      .pipe(map(SettingMapper.toDto));
  }

  public findSettings(
    user: User | UserDto,
    settingCriteria?: SettingCriteriaInput,
  ): Observable<SettingDto[]> {
    return this.settingsService
      .findSettings({ ...settingCriteria, authorId: this.getAuthorId(user) })
      .pipe(map(SettingMapper.toDtoArray));
  }

  private getAuthorId(user: User | UserDto): string {
    return user instanceof User ? user.username : user.id;
  }
}
