import { Injectable } from '@nestjs/common';
import { map, Observable, switchMap } from 'rxjs';

import { UseCaseException } from '@lib/fdo-domain';
import {
  Property,
  PropertyEnum,
  Setting,
  SettingCriteria,
  SettingEnum,
} from '~/domain';
import { CustomerSettingsUseCase } from '../use-cases/customer-settings.use-case';
import { SettingsService } from './settings.service';

@Injectable()
export class CustomerSettingsService {
  constructor(private readonly settingsService: SettingsService) {}

  public generateCode(criteria: SettingCriteria): Observable<string> {
    return this.settingsService.findSetting(new SettingCriteria(criteria)).pipe(
      map((setting) => {
        setting =
          setting ||
          CustomerSettingsUseCase.initializeCodeGeneratorSetting(
            criteria.authorId,
          );
        return this.settingsService.createOrUpdateSetting(
          new SettingCriteria(criteria),
          CustomerSettingsUseCase.incrementCounter(setting),
        );
      }),
      switchMap((setting$) =>
        setting$.pipe(
          map((setting) => CustomerSettingsUseCase.buildCode(setting)),
        ),
      ),
    );
  }

  public updateCodeGeneratorSetting(setting: Setting): Observable<Setting> {
    this.validateCodeGeneratorSetting(setting);

    return this.settingsService.updateSetting(setting);
  }

  private validateCodeGeneratorSetting(setting: Setting): void {
    const listErrors: string[] = [];

    if (!Boolean(setting.code)) {
      listErrors.push('The setting code is required');
    }
    if (setting.code !== SettingEnum.getEnum().CODE_GENERATOR) {
      listErrors.push('The setting code is not valid');
    }

    listErrors.push(
      ...this.validateCodeGeneratorProperties(setting?.properties),
    );

    if (listErrors.length > 0) {
      throw new UseCaseException(JSON.stringify(listErrors));
    }
  }

  private validateCodeGeneratorProperties(properties: Property[]): string[] {
    const listErrors: string[] = [];

    if (!Boolean(properties)) {
      listErrors.push('At least one property is required');
    } else {
      const counterProperty = properties.find(
        (property) => property.key === PropertyEnum.getEnum().COUNTER,
      );
      if (!Boolean(counterProperty)) {
        listErrors.push('The counter property is required');
      } else {
        const counter = Number(counterProperty.value);
        if (isNaN(counter)) {
          listErrors.push('The counter property is not valid');
        }
      }

      const nbCounterProperties = properties.filter(
        (property) => property.key === PropertyEnum.getEnum().COUNTER,
      ).length;
      if (nbCounterProperties > 1) {
        listErrors.push('The counter property should be unique');
      }

      const nbPrefixProperties = properties.filter(
        (property) => property.key === PropertyEnum.getEnum().PREFIX,
      ).length;
      if (nbPrefixProperties > 1) {
        listErrors.push('Too many prefix properties');
      }

      const nbSuffixProperties = properties.filter(
        (property) => property.key === PropertyEnum.getEnum().SUFFIX,
      ).length;
      if (nbSuffixProperties > 1) {
        listErrors.push('Too many suffix properties');
      }
    }
    return listErrors;
  }
}
