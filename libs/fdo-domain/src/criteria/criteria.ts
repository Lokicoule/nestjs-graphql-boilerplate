export type MixinType<T> = T extends new (...args: any[]) => infer R ? R : any;
export type Constructor<T = any> = new (...args: any[]) => T;

export const Criteria = <TBase extends Constructor>(Base: TBase) => {
  class BaseCriteria extends Base {
    constructor(...args: any[]) {
      super(...args);
      return this.query();
    }

    public query() {
      return JSON.parse(JSON.stringify(this));
    }
  }
  return BaseCriteria;
};
