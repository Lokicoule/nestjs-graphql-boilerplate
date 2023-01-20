import { TechnicalException, UseCaseException } from '@lib/fdo-domain';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Property, Setting, SettingCriteria } from '~/domain';
import { SettingsRepository } from '~/persistence';

@Injectable()
export class SettingsService {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  public createSetting(setting: Setting): Observable<Setting> {
    if (!Boolean(setting)) {
      throw new UseCaseException('The setting is null or undefined');
    }

    this.validateSetting(setting);
    return this.settingsRepository.create(setting);
  }

  public createOrUpdateSetting(
    criteria: SettingCriteria,
    setting: Setting,
  ): Observable<Setting> {
    if (!Boolean(setting)) {
      throw new UseCaseException('The setting is null or undefined');
    }

    console.log('criteria', criteria);
    console.log('setting', setting);
    this.validateSetting(setting);
    return this.settingsRepository.createOrUpdate(
      criteria /* .query */,
      setting,
    );
  }

  public updateSetting(setting: Setting): Observable<Setting> {
    if (!Boolean(setting)) {
      throw new TechnicalException('The setting is null or undefined');
    }
    if (!Boolean(setting._id)) {
      throw new TechnicalException('The setting id is required');
    }

    this.validateSetting(setting);
    return this.settingsRepository.findOneAndUpdate(
      {
        _id: setting._id,
        authorId: setting.authorId,
      },
      setting,
    );
  }

  public findSetting(settingCriteria: SettingCriteria): Observable<Setting> {
    if (!Boolean(settingCriteria)) {
      throw new TechnicalException('The setting criteria is null or undefined');
    }

    console.log('settingCriteria', settingCriteria);
    if (!Boolean(settingCriteria.authorId)) {
      throw new TechnicalException('The author id is required');
    }
    return this.settingsRepository.findOne(settingCriteria);
  }

  public findSettings(
    settingCriteria?: SettingCriteria,
  ): Observable<Setting[]> {
    if (!Boolean(settingCriteria)) {
      throw new TechnicalException('The setting criteria is null or undefined');
    }

    if (!Boolean(settingCriteria.authorId)) {
      throw new TechnicalException('The author id is required');
    }

    console.log('settingCriteria', settingCriteria);

    return this.settingsRepository.find(settingCriteria);
  }

  private validateSetting(setting: Setting): void {
    const listErrors: string[] = [];

    if (!Boolean(setting.authorId)) {
      throw new ForbiddenException('AUTHOR_ID_IS_REQUIRED');
    }

    if (!Boolean(setting.code)) {
      listErrors.push('The setting code is required');
    }

    if (!Boolean(setting.properties)) {
      listErrors.push('At least one property is required');
    } else {
      setting.properties.forEach((property: Property) => {
        listErrors.push(...this.validateProperty(property));
      });
    }

    if (listErrors.length > 0) {
      throw new UseCaseException(JSON.stringify(listErrors));
    }
  }

  private validateProperty(property: Property): string[] {
    const listErrors: string[] = [];
    if (!Boolean(property)) {
      listErrors.push('The property is null or undefined');
    } else {
      if (!Boolean(property.key)) {
        listErrors.push('The key is required');
      }
      if (!Boolean(property.value)) {
        listErrors.push('The value is required');
      }
    }
    return listErrors;
  }
}
