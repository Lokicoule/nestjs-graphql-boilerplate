import { SettingCriteriaBuilder } from './setting.criteria.builder';

export class SettingCriteria {
  public readonly _id?: string;
  public readonly code?: string;

  constructor(builder: SettingCriteriaBuilder) {
    if (Boolean(builder.id)) {
      this._id = builder.id;
    }
    if (Boolean(builder.code)) {
      this.code = builder.code;
    }
  }
}
