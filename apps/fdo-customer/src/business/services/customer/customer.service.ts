import { Injectable } from '@nestjs/common';
import { CustomerCriteria } from 'apps/fdo-customer/src/domain/criterias/customer.criteria';
import { Address } from 'apps/fdo-customer/src/domain/entities/address/address.entity';
import { Customer } from 'apps/fdo-customer/src/domain/entities/customer/customer.entity';
import { CustomerRepository } from 'apps/fdo-customer/src/persistence/repositories/customer/customer.repository';
import { TechnicalException, UseCaseException } from 'libs/fdo-domain/src';
import { Observable, throwIfEmpty } from 'rxjs';
import { AddressUseCase } from '../../use-cases/address.use-case';

@Injectable()
export class CustomerService {
  constructor(private readonly _customerRepository: CustomerRepository) {}

  public createCustomer(customer: Customer): Observable<Customer> {
    if (!Boolean(customer)) {
      throw new TechnicalException('The customer is required');
    }

    this.validateCustomer(customer);
    return this._customerRepository
      .create(customer)
      .pipe(throwIfEmpty(() => new Error('Customer not created')));
  }

  public updateCustomer(customer: Customer): Observable<Customer> {
    if (!Boolean(customer)) {
      throw new TechnicalException('The customer is null or undefined');
    }
    if (!Boolean(customer._id)) {
      throw new TechnicalException('The customer id is required');
    }

    this.validateCustomer(customer);
    return this._customerRepository.updateById(customer._id, customer);
  }

  public removeCustomerById(id: string): Observable<Customer> {
    return this._customerRepository.removeById(id);
  }

  public removeCustomersByIds(ids: string[]): Observable<boolean> {
    return this._customerRepository.removeByIds(ids);
  }

  public findCustomerById(id: string): Observable<Customer> {
    return this._customerRepository.findById(id);
  }

  public findCustomers(
    customerCriteria?: CustomerCriteria,
  ): Observable<Customer[]> {
    return this._customerRepository.find(customerCriteria);
  }

  private validateCustomer(customer: Customer): void {
    const listErrors: string[] = [];

    if (!Boolean(customer.code)) {
      listErrors.push('The customer code is required');
    }
    if (!Boolean(customer.name)) {
      listErrors.push('The customer name is required');
    }
    if (!Boolean(customer.addresses)) {
      listErrors.push('At least one address is required');
    } else {
      customer.addresses.forEach((address: Address) => {
        listErrors.push(...this.validateAddress(address));
      });
    }

    if (listErrors.length > 0) {
      throw new UseCaseException(JSON.stringify(listErrors));
    }
  }

  private validateAddress(address: Address): string[] {
    const listErrors: string[] = [];
    if (!Boolean(address)) {
      listErrors.push('The address is null or undefined');
    } else {
      if (!Boolean(address.street)) {
        listErrors.push('The street is required');
      }
      if (!Boolean(address.city)) {
        listErrors.push('The city is required');
      }
      if (!Boolean(address.country)) {
        listErrors.push('The country is required');
      }
      if (!Boolean(address.zipCode)) {
        listErrors.push('The zip code is required');
      } else {
        if (!AddressUseCase.validateZipCode(address.zipCode)) {
          listErrors.push('The zip code is invalid');
        }
      }
    }
    return listErrors;
  }
}
