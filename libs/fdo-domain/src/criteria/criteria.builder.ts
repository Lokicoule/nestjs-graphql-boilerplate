export abstract class CriteriaBuilder<T> {
  public abstract build(): T;

  /**
   * @name buildCriteria
   * @description Build a new instance of T and remove all the properties that are undefined.
   * @returns {T}
   */
  public buildCriteria(): T {
    return JSON.parse(JSON.stringify(this.build()));
  }
}
