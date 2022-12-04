import { EntityModel } from '@lib/fdo-database/mongodb/entity/entity.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address, AddressSchema } from '../address/address.entity';
import { Company, CompanySchema } from '../company/company.entity';
import { UserBuilder } from './user.entity.builder';

@Schema({ timestamps: true })
export class User extends EntityModel {
  @Prop({ required: true })
  public readonly cognitoId: string;

  @Prop({ required: true, uppercase: true })
  public readonly firstName: string;

  @Prop({ required: true, uppercase: true })
  public readonly lastName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  public readonly email: string;

  @Prop({ required: true, lowercase: true })
  public readonly phone: string;

  @Prop({
    type: AddressSchema,
  })
  public readonly address: Address;

  @Prop({
    type: CompanySchema,
  })
  public readonly company: Company;

  constructor(builder: UserBuilder) {
    super(builder);
    this.cognitoId = builder.cognitoId;
    this.firstName = builder.firstName;
    this.lastName = builder.lastName;
    this.email = builder.email;
    this.phone = builder.phone;
    this.address = builder.address;
    this.company = builder.company;
  }

  public static get Builder(): typeof UserBuilder {
    return UserBuilder;
  }

  public readonly getFullName = (): string => {
    return `${this.firstName} ${this.lastName}`;
  };
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
