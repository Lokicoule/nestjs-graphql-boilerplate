import { CriteriaBuilder } from '@lib/fdo-domain';
import { UserCriteria } from './user.criteria';

export class UserCriteriaBuilder extends CriteriaBuilder<UserCriteria> {
  private _id: string;
  private _email: string;

  public withId(id: string): UserCriteriaBuilder {
    this._id = id;
    return this;
  }

  public withEmail(email: string): UserCriteriaBuilder {
    this._email = email;
    return this;
  }

  public get id(): string {
    return this._id;
  }

  public get email(): string {
    return this._email;
  }

  public build(): UserCriteria {
    return new UserCriteria(this);
  }
}
