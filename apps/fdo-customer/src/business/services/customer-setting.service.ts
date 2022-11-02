import { Injectable } from '@nestjs/common';
import { duplicateRetryStrategy } from '@lib/fdo-database/mongodb/retry/duplicate-retry.strategy';
import { defer, map, Observable, of, retry, switchMap } from 'rxjs';
import { Customer } from '../../domain/entities/customer/customer.entity';
import { SettingCodeEnum } from '../../domain/enums/setting/setting.enum';
import { CustomerRepository } from '../../persistence/repositories/customer/customer.repository';
import { CustomerUseCase } from '../use-cases/customer.use-case';
import { SettingService } from './setting.service';

@Injectable()
export class CustomerSettingService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly _settingService: SettingService,
  ) {}

  public generateCustomer(customer: Customer): Observable<Customer> {
    return defer(() =>
      this._settingService.findSetting({
        code: SettingCodeEnum.CODE_GENERATOR,
      }),
    ).pipe(
      map((setting) =>
        this._settingService.updateSetting(
          CustomerUseCase.incrementCounter(setting),
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
}
