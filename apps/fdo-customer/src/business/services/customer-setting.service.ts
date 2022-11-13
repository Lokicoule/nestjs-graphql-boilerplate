import { duplicateRetryStrategy } from '@lib/fdo-database/mongodb/retry/duplicate-retry.strategy';
import { UseCaseException } from '@lib/fdo-domain';
import { Injectable } from '@nestjs/common';
import { defer, map, Observable, of, retry, switchMap } from 'rxjs';
import { SettingCriteria } from '../../domain/criterias/Setting/Setting.criteria';
import { Customer } from '../../domain/entities/customer/customer.entity';
import { Property } from '../../domain/entities/property/property.entity';
import { Setting } from '../../domain/entities/setting/setting.entity';
import { PropertyKeyEnum } from '../../domain/enums/property/property.enum';
import { SettingCodeEnum } from '../../domain/enums/setting/setting.enum';
import { CustomerRepository } from '../../persistence/repositories/customer/customer.repository';
import { CustomerUseCase } from '../use-cases/customer.use-case';
import { SettingService } from './setting.service';

@Injectable()
export class CustomerSettingService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly settingService: SettingService,
  ) {}

  public generateCustomer(customer: Customer): Observable<Customer> {
    return defer(() =>
      this.settingService.findSetting({
        code: SettingCodeEnum.CODE_GENERATOR,
      }),
    ).pipe(
      map((setting) =>
        this.settingService.createOrUpdateSetting(
          new SettingCriteria.Builder()
            .withCode(SettingCodeEnum.CODE_GENERATOR)
            .buildCriteria(),
          CustomerUseCase.incrementCounter(
            setting || CustomerUseCase.initializeCodeGeneratorSetting(),
          ),
        ),
      ),
      switchMap((setting$) =>
        setting$.pipe(map((setting) => CustomerUseCase.generateCode(setting))),
      ),
      switchMap((code: string) =>
        of(new Customer.Builder().copy(customer).setCode(code).build()),
      ),
      switchMap((customer) => this.customerRepository.create(customer)),
      retry({ count: 10, delay: duplicateRetryStrategy }),
    );
  }

  public updateCodeGeneratorSetting(setting: Setting): Observable<Setting> {
    this.validateCodeGeneratorSetting(setting);
    return this.settingService.updateSetting(setting);
  }

  private validateCodeGeneratorSetting(setting: Setting): void {
    const listErrors: string[] = [];

    if (!Boolean(setting.code)) {
      listErrors.push('setting.code.required');
    }
    if (setting.code !== SettingCodeEnum.CODE_GENERATOR) {
      listErrors.push('The setting code is not valid');
    }

    listErrors.push(
      ...this.validateCodeGeneratorProperties(setting?.properties),
    );

    if (listErrors.length > 0) {
      throw new UseCaseException(listErrors);
    }
  }

  private validateCodeGeneratorProperties(properties: Property[]): string[] {
    const listErrors: string[] = [];

    if (!Boolean(properties)) {
      listErrors.push('At least one property is required');
    } else {
      const counterProperty = properties.find(
        (property) => property.key === PropertyKeyEnum.COUNTER,
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
        (property) => property.key === PropertyKeyEnum.COUNTER,
      ).length;
      if (nbCounterProperties > 1) {
        listErrors.push('The counter property should be unique');
      }

      const nbPrefixProperties = properties.filter(
        (property) => property.key === PropertyKeyEnum.PREFIX,
      ).length;
      if (nbPrefixProperties > 1) {
        listErrors.push('Too many prefix properties');
      }

      const nbSuffixProperties = properties.filter(
        (property) => property.key === PropertyKeyEnum.SUFFIX,
      ).length;
      if (nbSuffixProperties > 1) {
        listErrors.push('Too many suffix properties');
      }
    }
    return listErrors;
  }
}
