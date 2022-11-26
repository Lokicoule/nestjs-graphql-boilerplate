import { UserCriteriaBuilder } from './user.criteria.builder';

export class UserCriteria {
  public readonly _id?: string;
  public readonly email?: string;

  constructor(builder: UserCriteriaBuilder) {
    if (Boolean(builder.id)) {
      this._id = builder.id;
    }
    if (Boolean(builder.email)) {
      this.email = builder.email;
    }
  }
}
