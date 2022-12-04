import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ClientSession, Connection } from 'mongoose';
import { EntityModel } from '../entity/entity.model';
import { Observable } from 'rxjs';

@Injectable()
export class TransactionManager {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  /**
   * @method withAsyncTransaction
   * @param callback
   * @returns Promise<T>
   * @description This method is used to execute a transaction with async/await
   * @example
   * const result = await this.transactionManager.withAsyncTransaction(async (session) => {
   *  const user = await this.userRepository.createAsync(userEntity, session);
   *  const profile = await this.profileRepository.createAsync(profileEntity, session);
   *  return { user, profile };
   * });
   */
  public async withAsyncTransaction<T>(
    callback: (session: ClientSession) => Promise<T>,
  ): Promise<T> {
    const manager = new Transaction(this.connection);
    await manager.startTransaction();
    try {
      const result = await callback(await manager.getSession());
      await manager.commitTransaction();
      return result;
    } catch (error) {
      await manager.abortTransaction();
      throw error;
    } finally {
      await manager.endSession();
    }
  }

  /**
   * @method withTransaction
   * @param callback
   * @returns Observable<T>
   * @description This method is used to execute a transaction with rxjs
   * @note This method is not tested yet
   * @todo Test this method
   * Maybe this method is not necessary
   */
  public withObservableTransaction<T>(
    callback: (session: ClientSession) => Observable<T>,
  ): Observable<T> {
    const manager = new Transaction(this.connection);
    return new Observable<T>((subscriber) => {
      manager.startTransaction().then(() => {
        manager
          .getSession()
          .then((session) => {
            callback(session)
              .subscribe({
                next: (value) => subscriber.next(value),
                error: (error) => {
                  manager.abortTransaction().then(() => {
                    subscriber.error(error);
                  });
                },
                complete: () => {
                  manager.commitTransaction().then(() => {
                    subscriber.complete();
                  });
                },
              })
              .add(() => {
                manager.endSession();
              });
          })
          .catch((error) => {
            subscriber.error(error);
          });
      });
    });
  }
}

class Transaction {
  private readonly session: Promise<ClientSession>;

  constructor(connection: Connection) {
    this.session = connection.startSession();
  }

  public getSession(): Promise<ClientSession> {
    return this.session;
  }

  public async startTransaction(): Promise<void> {
    const session = await this.session;
    await session.startTransaction();
  }

  public async commitTransaction(): Promise<void> {
    const session = await this.session;
    await session.commitTransaction();
  }

  public async abortTransaction(): Promise<void> {
    const session = await this.session;
    await session.abortTransaction();
  }

  public async endSession(): Promise<void> {
    const session = await this.session;
    await session.endSession();
  }

  public async withTransaction<T>(
    callback: (session: ClientSession) => Promise<T>,
  ): Promise<T> {
    const session = await this.session;
    return await callback(session);
  }

  public async withTransactionAndModel<T>(
    model: typeof EntityModel,
    callback: (session: ClientSession, model: typeof EntityModel) => Promise<T>,
  ): Promise<T> {
    const session = await this.session;
    return await callback(session, model);
  }
}
