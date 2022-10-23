import { FilterQuery } from 'mongoose';
import { Observable } from 'rxjs';
import { IPopulate } from './populate';

interface IQueryRepository<T> extends IPopulate {
  find(conditions?: FilterQuery<T>): Observable<T[]>;
  findById(id: any): Observable<T>;
  findOne(
    conditions: FilterQuery<T>,
    projection?: string | Record<string, unknown>,
    options?: Record<string, unknown>,
  ): Observable<T>;
}

interface IMutationRepository<T> {
  create(item: Partial<T>): Observable<T>;
  updateById(id: any, item: Partial<T>): Observable<T>;
  createOrUpdate(filter: any, item: T): Observable<T>;
  removeById(id: any): Observable<T>;
  removeByIds(ids: any[]): Observable<boolean>;
}

export interface IRepository<T>
  extends IQueryRepository<T>,
    IMutationRepository<T> {
  findOneOrCreate(
    conditions: FilterQuery<T>,
    entity: Partial<T>,
  ): Observable<T>;
}
