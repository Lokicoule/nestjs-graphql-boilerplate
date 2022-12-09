import { TransactionManager } from '@lib/fdo-database/mongodb/transaction/transaction-manager.service';
import { TechnicalException, UseCaseException } from '@lib/fdo-domain';
import { StringValidationUtils } from '@lib/fdo-utils/string-validation.utils';
import { Injectable } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { from, Observable } from 'rxjs';
import { UserCriteria } from '../../domain/criterias/user/user.criteria';
import { UserCriteriaBuilder } from '../../domain/criterias/user/user.criteria.builder';
import { Address } from '../../domain/entities/address/address.entity';
import { Company } from '../../domain/entities/company/company.entity';
import { User } from '../../domain/entities/user/user.entity';
import { UserRepository } from '../../persistence/repositories/user/user.repository';
import { CognitoService } from './cognito.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cognitoService: CognitoService,
    private readonly transactionManager: TransactionManager,
  ) {}

  public createUser(user: User): Observable<User> {
    if (!Boolean(user)) {
      throw new TechnicalException('The user is required');
    }

    this.validateUser(user);

    return from(
      this.transactionManager.withAsyncTransaction(
        async (session: ClientSession) => {
          const createdUser = await this.userRepository.createAsync(
            user,
            session,
          );
          await this.cognitoService.addUserToGroup(
            'User',
            createdUser.cognitoId,
            process.env.COGNITO_USER_POOL_ID,
          );
          return createdUser;
        },
      ),
    );
  }

  public updateUser(user: User): Observable<User> {
    if (!Boolean(user)) {
      throw new TechnicalException('The user is null or undefined');
    }
    if (!Boolean(user._id)) {
      throw new UseCaseException('The user id is required');
    }

    this.validateUser(user);
    return this.userRepository.updateById(user._id, user);
  }

  /**
   * This method is used to add or replace data in the user collection
   * @param user
   * @returns {Observable<User>}
   * @memberof UserService
   */
  public replaceUser(user: User): Observable<User> {
    if (!Boolean(user)) {
      throw new TechnicalException('The user is null or undefined');
    }
    const userCriteriaBuilder = new UserCriteriaBuilder();

    if (Boolean(user._id)) {
      userCriteriaBuilder.withId(user._id.toString());
    } else if (Boolean(user.email)) {
      userCriteriaBuilder.withEmail(user.email);
    } else {
      throw new UseCaseException('Expected id or email');
    }

    return this.userRepository.replace(
      userCriteriaBuilder.buildCriteria(),
      user,
    );
  }

  public findUserById(id: string): Observable<User> {
    return this.userRepository.findById(id);
  }

  public findUser(userCriteria: UserCriteria): Observable<User> {
    return this.userRepository.findOne(userCriteria);
  }

  public findUsers(userCriteria?: UserCriteria): Observable<User[]> {
    return this.userRepository.find(userCriteria);
  }

  private validateUser(user: User): void {
    const listErrors: string[] = [];

    if (!Boolean(user.firstName)) {
      listErrors.push('The first name is required');
    }

    if (!Boolean(user.lastName)) {
      listErrors.push('The last name is required');
    }

    if (!Boolean(user.email)) {
      listErrors.push('The email is required');
    } else if (!StringValidationUtils.isEmail(user.email)) {
      listErrors.push('The email is invalid');
    }

    if (!Boolean(user.phone)) {
      listErrors.push('The phone is required');
    } else if (!StringValidationUtils.isPhone(user.phone)) {
      listErrors.push('The phone is invalid');
    }

    if (Boolean(user.address)) {
      const addressErrors = this.validateAddress(user.address);
      listErrors.push(...addressErrors);
    }

    if (Boolean(user.company)) {
      const companyErrors = this.validateCompany(user.company);
      listErrors.push(...companyErrors);
    }

    if (listErrors.length > 0) {
      throw new UseCaseException(JSON.stringify(listErrors));
    }
  }

  private validateAddress(address: Address): string[] {
    const listErrors: string[] = [];

    if (!Boolean(address.address)) {
      listErrors.push('The address is required');
    }

    if (!Boolean(address.city)) {
      listErrors.push('The city is required');
    }

    if (!Boolean(address.country)) {
      listErrors.push('The country is required');
    }

    if (!Boolean(address.zipCode)) {
      listErrors.push('The zip code is required');
    } else if (!StringValidationUtils.isZipCode(address.zipCode)) {
      listErrors.push('The zip code is invalid');
    }

    return listErrors;
  }

  private validateCompany(company: Company): string[] {
    const listErrors: string[] = [];

    if (!Boolean(company.name)) {
      listErrors.push('The company name is required');
    }

    if (!Boolean(company.vatNumber)) {
      listErrors.push('The vat number is required');
    } else if (!StringValidationUtils.isVAT(company.vatNumber)) {
      listErrors.push('The vat number is invalid');
    }

    if (!Boolean(company.rcsNumber)) {
      listErrors.push('The rcs number is required');
    } else if (!StringValidationUtils.isRCS(company.rcsNumber)) {
      listErrors.push('The rcs number is invalid');
    }

    if (!Boolean(company.siren)) {
      listErrors.push('The siren is required');
    } else if (!StringValidationUtils.isSIREN(company.siren)) {
      listErrors.push('The siren is invalid');
    }

    if (!Boolean(company.siret)) {
      listErrors.push('The siret is required');
    } else if (!StringValidationUtils.isSIRET(company.siret)) {
      listErrors.push('The siret is invalid');
    }

    return listErrors;
  }
}
