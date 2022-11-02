import { CriteriaBuilder } from '@lib/fdo-domain';
import { SettingCriteria } from './setting.criteria';

export class SettingCriteriaBuilder extends CriteriaBuilder<SettingCriteria> {
  private _id: string;
  private _code: string;

  public withId(id: string): SettingCriteriaBuilder {
    this._id = id;
    return this;
  }

  public withCode(code: string): SettingCriteriaBuilder {
    this._code = code;
    return this;
  }

  public get id(): string {
    return this._id;
  }

  public get code(): string {
    return this._code;
  }

  /**
   * @override
   * @description Build a new instance of CustomerCriteria and remove all the properties that are undefined.
   * @returns {CustomerCriteria}
   */
  public build(): SettingCriteria {
    return new SettingCriteria(this);
  }
}
