import { Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { from, Observable, of, switchMap, throwIfEmpty } from 'rxjs';
import { Populate } from './populate/populate';
import { IRepository } from './repository.interface';

@Injectable()
export abstract class Repository<T> extends Populate implements IRepository<T> {
  protected constructor(private readonly model: Model<T>) {
    super();
  }

  public create(entity: Partial<T>): Observable<T> {
    return from(this.model.create(entity)).pipe(
      throwIfEmpty(() => new Error('Entity not created')),
    );
  }

  public find(conditions?: FilterQuery<T>): Observable<T[]> {
    return from(this.model.find(conditions)) as Observable<T[]>;
  }

  public findById(id: any): Observable<T> {
    if (!Boolean(id)) return;

    return from(this.model.findById(id));
  }

  public findOne(conditions: FilterQuery<T>): Observable<T> {
    if (!Boolean(conditions)) return;

    return from(this.model.findOne(conditions));
  }

  public findOneOrCreate(
    conditions: FilterQuery<T>,
    entity: Partial<T>,
  ): Observable<T> {
    if (!Boolean(conditions)) return;

    return this.findOne(conditions).pipe(
      switchMap((value) => {
        if (value) return of(value);
        return this.create(entity);
      }),
    );
  }

  public updateById(id: any, entity: Partial<T>): Observable<T> {
    if (!Boolean(id)) return;

    return from(this.model.findByIdAndUpdate(id, entity));
  }

  public createOrUpdate(
    filter: FilterQuery<T>,
    entity: Partial<T>,
  ): Observable<T> {
    if (!Boolean(filter)) return;

    return from(
      this.model.findOneAndUpdate(filter, entity, {
        new: true,
        upsert: true,
      }),
    );
  }

  public removeById(id: string): Observable<T> {
    return from(
      this.model.findOneAndRemove({
        _id: id,
      }),
    );
  }

  public removeByIds(ids: string[]): Observable<boolean> {
    return from(
      this.model
        .deleteMany({
          _id: {
            $in: ids,
          },
        })
        .then(({ deletedCount }) => deletedCount > 0),
    );
  }
}
