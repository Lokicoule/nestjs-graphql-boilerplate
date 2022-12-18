import { Criteria } from '@lib/fdo-domain/criteria/criteria';

export interface ISettingCriteria {
  id?: string;
  code?: string;
  authorId?: string;
}

@Criteria
export class SettingCriteria implements ISettingCriteria {
  public readonly _id?: string;
  public readonly code?: string;
  public readonly authorId?: string;

  constructor(data: ISettingCriteria) {
    this._id = data.id;
    this.code = data.code;
    this.authorId = data.authorId;
  }
}
