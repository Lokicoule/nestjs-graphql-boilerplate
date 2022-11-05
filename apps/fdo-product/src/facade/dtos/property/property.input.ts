import { Field, ID, InputType } from '@nestjs/graphql';
import { PropertyKeyEnum } from '../../../domain/enums/property/property.enum';

@InputType()
export class PropertyInput {
  @Field(() => ID, { name: 'id', nullable: true })
  protected readonly _id?: string;

  @Field(() => PropertyKeyEnum, { name: 'key' })
  private readonly _key: PropertyKeyEnum;

  @Field(() => String, { name: 'value' })
  private readonly _value: string;

  public get id(): string {
    return this._id;
  }

  public get key(): PropertyKeyEnum {
    return this._key;
  }

  public get value(): string {
    return this._value;
  }
}
