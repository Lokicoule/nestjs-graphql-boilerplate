/* import { Prop } from '@nestjs/mongoose';
//ClassDecorator
export type MixinType<T> = T extends new (...args: any[]) => infer R ? R : any;
export type Constructor<T = {}> = new (...args: any[]) => T;

export const Entity = <TBase extends Constructor>(Base: TBase) => {
  class BaseEntity extends Base {
    @Prop()
    public createdAt: Date;

    @Prop()
    public updatedAt: Date;
  }
  return BaseEntity;
};
 */
