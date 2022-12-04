import { ClientSession, FilterQuery, HydratedDocument, Model } from 'mongoose';
import { from, Observable, of, switchMap } from 'rxjs';
import { Populate } from './populate/populate';
import { IRepository } from './repository.interface';

export abstract class Repository<T> extends Populate implements IRepository<T> {
  protected constructor(private readonly model: Model<T>) {
    super();
  }

  public create(entity: Partial<T>): Observable<T> {
    return from(this.model.create(entity));
  }

  public async createAsync(
    entity: Partial<T>,
    session?: ClientSession,
  ): Promise<T> {
    const model = new this.model(entity);
    const result = await model.save({ session });

    return result.toObject() as T;
  }

  public find(conditions?: FilterQuery<T>): Observable<T[]> {
    return from(this.model.find(conditions)) as Observable<T[]>;
  }

  public findById(id: any): Observable<T> {
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
    return from(this.model.findByIdAndUpdate(id, entity));
  }

  public replace(
    conditions: FilterQuery<T>,
    entity: Partial<T>,
  ): Observable<T> {
    return from(this.model.findByIdAndUpdate(conditions, { $set: entity }));
  }

  public createOrUpdate(
    conditions: FilterQuery<T>,
    entity: Partial<T>,
  ): Observable<T> {
    if (!Boolean(conditions)) return;

    return from(
      this.model.findOneAndUpdate(conditions, entity, {
        new: true,
        upsert: true,
      }),
    );
  }

  public remove(entity: Partial<T>): Observable<T> {
    return from(this.model.remove(entity));
  }

  public removeById(id: any): Observable<T> {
    return from(
      this.model.findOneAndRemove({
        _id: id,
      }),
    );
  }

  public removeByIds(ids: any[]): Observable<boolean> {
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
