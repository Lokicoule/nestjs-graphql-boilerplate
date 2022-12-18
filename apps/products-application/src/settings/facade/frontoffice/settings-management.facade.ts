import { User } from '@nestjs-cognito/auth';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../../../users/facade/dtos/user.dto';
import { map, Observable } from 'rxjs';
import { SettingsService } from '../../business/services/settings.service';
import { SettingCriteriaInput } from '../dtos/inputs/setting-criteria.input';
import { SettingInput } from '../dtos/inputs/setting.input';
import { SettingDto } from '../dtos/setting.dto';
import { SettingMapper } from '../mapping/setting.mapper';
import { SettingCriteria } from '../../domain/criterias/setting.criteria';
import { Setting } from '../../domain/entities/setting.entity';

@Injectable()
export class SettingsManagementFacade {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly settingMapper: SettingMapper,
  ) {}

  createOrUpdateSetting(
    settingCriteria: SettingCriteriaInput,
    setting: Setting,
  ): Observable<SettingDto> {
    return this.settingsService
      .createOrUpdateSetting(
        this.settingMapper.toCriteria(settingCriteria),
        setting,
      )
      .pipe(map((dto) => this.settingMapper.toDto(dto)));
  }

  public updateSetting(
    user: User | string,
    input: SettingInput | Setting,
  ): Observable<SettingDto> {
    return this.settingsService
      .updateSetting(this.getSetting(input, user))
      .pipe(map((dto) => this.settingMapper.toDto(dto)));
  }

  public findSetting(
    user: User | string,
    settingCriteria?: SettingCriteriaInput,
  ): Observable<SettingDto> {
    return this.settingsService
      .findSetting(
        new SettingCriteria({
          ...settingCriteria,
          authorId: this.getAuthorId(user),
        }),
      )
      .pipe(map((dto) => this.settingMapper.toDto(dto)));
  }

  public findSettingById(
    user: User | string,
    settingId: string,
  ): Observable<SettingDto> {
    return this.settingsService
      .findSetting(
        new SettingCriteria({
          id: settingId,
          authorId: this.getAuthorId(user),
        }),
      )
      .pipe(map((dto) => this.settingMapper.toDto(dto)));
  }

  public findSettings(
    user: User | UserDto,
    settingCriteria?: SettingCriteriaInput,
  ): Observable<SettingDto[]> {
    return this.settingsService
      .findSettings(
        new SettingCriteria({
          ...settingCriteria,
          authorId: this.getAuthorId(user),
        }),
      )
      .pipe(map((dto) => this.settingMapper.toDtoArray(dto)));
  }

  private getSetting(
    setting: SettingInput | Setting,
    user: User | string,
  ): Setting {
    if (setting instanceof Setting) {
      return setting;
    } else {
      return this.settingMapper.toEntity({
        ...setting,
        authorId: this.getAuthorId(user),
      });
    }
  }

  private getAuthorId(user: User | UserDto | string): string {
    if (user instanceof User) {
      return user.username;
    } else if (user instanceof UserDto) {
      return user.id;
    } else {
      return user;
    }
  }
}
