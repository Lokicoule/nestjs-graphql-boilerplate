import { Injectable } from '@nestjs/common';
import { defer, map, Observable, of, retry, switchMap } from 'rxjs';

import { duplicateRetryStrategy } from '@lib/fdo-database/mongodb/retry/duplicate-retry.strategy';
import { UseCaseException } from '@lib/fdo-domain';

import { SettingsService } from '../../../settings/business/services/settings.service';
import { SettingCriteria } from '../../../settings/domain/criterias/setting.criteria';
import { Property } from '../../../settings/domain/entities/property.entity';
import { Setting } from '../../../settings/domain/entities/setting.entity';
import { PropertyEnum } from '../../../settings/domain/enums/property.enum';
import { SettingEnum } from '../../../settings/domain/enums/setting.enum';
import { Product } from '../../domain/entities/product.entity';
import { ProductsRepository } from '../../persistence/repositories/products.repository';
import { ProductUseCase } from '../use-cases/product.use-case';

@Injectable()
export class ProductsSettingsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly settingsService: SettingsService,
  ) {}

  public generateProduct(product: Product): Observable<Product> {
    return defer(() =>
      this.settingsService.findSetting(
        new SettingCriteria({
          code: SettingEnum.getEnum().CODE_GENERATOR,
          authorId: product.authorId,
        }) /* .query */,
      ),
    ).pipe(
      map((setting) =>
        this.settingsService.createOrUpdateSetting(
          new SettingCriteria({
            code: SettingEnum.getEnum().CODE_GENERATOR,
            authorId: product.authorId,
          }),
          ProductUseCase.incrementCounter(
            setting ||
              ProductUseCase.initializeCodeGeneratorSetting(product.authorId),
          ),
        ),
      ),
      switchMap((setting$) =>
        setting$.pipe(map((setting) => ProductUseCase.generateCode(setting))),
      ),
      switchMap((code: string) =>
        of(
          new Product({
            ...product,
            code,
          }),
        ),
      ),
      switchMap((product) => this.productsRepository.create(product)),
      retry({ count: 10, delay: duplicateRetryStrategy }),
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
