import { UseCaseException } from '@lib/fdo-domain';
import { Property } from '../../domain/entities/property.entity';
import { Setting } from '../../domain/entities/setting.entity';
import { PropertyEnum } from '../../domain/enums/property.enum';
import { SettingEnum } from '../../domain/enums/setting.enum';

export class CodeGeneratorUseCase {
  public static validateSetting(setting: Setting): void {
    const listErrors: string[] = [];

    if (!Boolean(setting.code)) {
      listErrors.push('The setting code is required');
    }
    if (setting.code !== SettingEnum.getEnum().CODE_GENERATOR) {
      listErrors.push('The setting code is not valid');
    }

    listErrors.push(...this.validateProperties(setting?.properties));

    if (listErrors.length > 0) {
      throw new UseCaseException(JSON.stringify(listErrors));
    }
  }

  public static validateProperties(properties: Property[]): string[] {
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
