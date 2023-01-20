import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { SettingsService } from '~/business';
import { Setting, SettingCriteria } from '~/domain';
import { SettingCriteriaInput, SettingDto, SettingInput } from '../dtos';
import { SettingMapper } from '../mapping';

@Injectable()
export class SettingsManagementFacade {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly settingMapper: SettingMapper,
  ) {}

  public updateSetting(
    authorId: string,
    input: SettingInput | Setting,
  ): Observable<SettingDto> {
    return this.settingsService
      .updateSetting(this.getSetting(input, authorId))
      .pipe(map((dto) => this.settingMapper.toDto(dto)));
  }

  public findSetting(
    authorId: string,
    settingCriteria?: SettingCriteriaInput,
  ): Observable<SettingDto> {
    return this.settingsService
      .findSetting(
        new SettingCriteria({
          ...settingCriteria,
          authorId,
        }),
      )
      .pipe(map((dto) => this.settingMapper.toDto(dto)));
  }

  public findSettingById(
    authorId: string,
    settingId: string,
  ): Observable<SettingDto> {
    return this.settingsService
      .findSetting(
        new SettingCriteria({
          id: settingId,
          authorId,
        }),
      )
      .pipe(map((dto) => this.settingMapper.toDto(dto)));
  }

  public findSettings(
    authorId: string,
    settingCriteria?: SettingCriteriaInput,
  ): Observable<SettingDto[]> {
    return this.settingsService
      .findSettings(
        new SettingCriteria({
          ...settingCriteria,
          authorId,
        }),
      )
      .pipe(
        map((dto) => {
          console.log('dto', dto);
          return this.settingMapper.toDtoArray(dto);
        }),
      );
  }

  private getSetting(
    setting: SettingInput | Setting,
    authorId: string,
  ): Setting {
    if (setting instanceof Setting) {
      return setting;
    } else {
      return this.settingMapper.toEntity({
        ...setting,
        authorId,
      });
    }
  }
}
