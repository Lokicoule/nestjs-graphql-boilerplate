import { Field, ID, InputType } from '@nestjs/graphql';
import { PropertyKeyEnum } from '../../../domain/enums/property.enum';

@InputType()
export class PropertyInput {
  @Field(() => ID, { name: 'id', nullable: true })
  public readonly id?: string;

  @Field(() => PropertyKeyEnum, { name: 'key' })
  public readonly key: PropertyKeyEnum;

  @Field(() => String, { name: 'value' })
  public readonly value: string;
}
