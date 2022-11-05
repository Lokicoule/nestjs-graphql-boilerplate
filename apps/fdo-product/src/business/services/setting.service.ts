import { TechnicalException, UseCaseException } from '@lib/fdo-domain';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SettingCriteria } from '../../domain/criterias/Setting/Setting.criteria';
import { Property } from '../../domain/entities/property/property.entity';
import { Setting } from '../../domain/entities/Setting/Setting.entity';
import { SettingRepository } from '../../persistence/repositories/setting/setting.repository';

@Injectable()
export class SettingService {
  constructor(private readonly _settingRepository: SettingRepository) {}

  public updateSetting(setting: Setting): Observable<Setting> {
    if (!Boolean(setting)) {
      throw new TechnicalException('The setting is null or undefined');
    }
    if (!Boolean(setting._id)) {
      throw new TechnicalException('The setting id is required');
    }

    this.validateSetting(setting);
    return this._settingRepository.updateById(setting._id, setting);
  }

  public findSettingById(id: string): Observable<Setting> {
    return this._settingRepository.findById(id);
  }

  public findSetting(settingCriteria: SettingCriteria): Observable<Setting> {
    return this._settingRepository.findOne(settingCriteria);
  }

  public findSettings(
    settingCriteria?: SettingCriteria,
  ): Observable<Setting[]> {
    return this._settingRepository.find(settingCriteria);
  }

  private validateSetting(setting: Setting): void {
    const listErrors: string[] = [];

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
