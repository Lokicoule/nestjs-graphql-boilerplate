import { duplicateRetryStrategy } from '@lib/fdo-database/mongodb/retry/duplicate-retry.strategy';
import { TechnicalException, UseCaseException } from '@lib/fdo-domain';
import { Injectable } from '@nestjs/common';
import {
  defer,
  Observable,
  of,
  retry,
  switchMap,
  tap,
  throwIfEmpty,
} from 'rxjs';
import {
  Customer,
  CustomerCriteria,
  SettingCriteria,
  SettingEnum,
} from '~/domain';
import { CustomersRepository } from '~/persistence';
import { CustomerSettingsService } from './customer-settings.service';

@Injectable()
export class CustomersService {
  constructor(
    private readonly customersRepository: CustomersRepository,
    private readonly customerSettingsService: CustomerSettingsService,
  ) {}

  public createCustomer(customer: Customer): Observable<Customer> {
    if (!Boolean(customer)) {
      throw new TechnicalException('CUSTOMER_IS_NULL');
    }
    if (!Boolean(customer.code)) {
      return this.generateCustomer(customer);
    }

    return this.customersRepository
      .findIfExists({
        code: customer.code,
        authorId: customer.authorId,
      })
      .pipe(
        tap((exists) => {
          if (exists) {
            throw new UseCaseException('CUSTOMER_CODE_ALREADY_EXISTS');
          }
          this.validateCustomer(customer);
        }),
        switchMap(() => this.customersRepository.create(customer)),
        throwIfEmpty(() => new TechnicalException('CUSTOMER_NOT_CREATED')),
      );
  }

  public updateCustomer(customer: Customer): Observable<Customer> {
    if (!Boolean(customer)) {
      throw new TechnicalException('CUSTOMER_IS_NULL');
    }
    if (!Boolean(customer._id)) {
      throw new UseCaseException('CUSTOMER_ID_IS_NULL');
    }

    this.validateCustomer(customer);
    return this.customersRepository
      .find({
        code: customer.code,
        authorId: customer.authorId,
      })
      .pipe(
        tap((customers) => {
          if (
            customers.some(
              (customerFound) => customerFound._id?.toString() !== customer._id,
            )
          ) {
            throw new UseCaseException('CUSTOMER_CODE_ALREADY_EXISTS');
          }
          this.validateCustomer(customer);
        }),
        switchMap(() =>
          this.customersRepository.updateById(customer._id, customer),
        ),
      );
  }

  public removeCustomerById(
    authorId: string,
    id: string,
  ): Observable<Customer> {
    return this.customersRepository.removeByConditions({
      authorId,
      _id: id,
    });
  }

  public removeCustomersByIds(
    authorId: string,
    ids: string[],
  ): Observable<boolean> {
    return this.customersRepository.removeMany({
      authorId,
      _id: { $in: ids },
    });
  }

  public findCustomerById(authorId: string, id: string): Observable<Customer> {
    return this.customersRepository.findOne({
      _id: id,
      authorId,
    });
  }

  public findCustomers(
    customerCriteria?: CustomerCriteria,
  ): Observable<Customer[]> {
    return this.customersRepository.find(customerCriteria);
  }

  private generateCustomer(customer: Customer): Observable<Customer> {
    return defer(() =>
      this.customerSettingsService.generateCode(
        new SettingCriteria({
          authorId: customer.authorId,
          code: SettingEnum.getEnum().CODE_GENERATOR,
        }),
      ),
    ).pipe(
      switchMap((code: string) =>
        of(
          new Customer({
            ...customer,
            code,
          }),
        ),
      ),
      switchMap((customer) => this.customersRepository.create(customer)),
      retry({ count: 10, delay: duplicateRetryStrategy }),
    );
  }

  private validateCustomer(customer: Customer): void {
    const listErrors: string[] = [];

    if (!Boolean(customer.authorId)) {
      listErrors.push('AUTHOR_ID_IS_NULL');
    }

    if (!Boolean(customer.code)) {
      listErrors.push('CUSTOMER_CODE_IS_NULL');
    }

    if (!Boolean(customer.name)) {
      listErrors.push('CUSTOMER_NAME_IS_NULL');
    }

    //TODO validate other fields here and add validation for email and phone

    if (listErrors.length > 0) {
      throw new UseCaseException(JSON.stringify(listErrors));
    }
  }
}
