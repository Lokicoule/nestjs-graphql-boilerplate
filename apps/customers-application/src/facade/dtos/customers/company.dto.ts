import { DtoModel, IDtoModel } from '@lib/fdo-graphql';
import { Field, ObjectType } from '@nestjs/graphql';

export interface ICompanyDto extends IDtoModel {
  name: string;
  vatNumber: string;
  rcsNumber: string;
  siretNumber: string;
  sirenNumber: string;
}

/**
 * @class CompanyDto
 * @description Data Transfer Object for Company
 * @see CompanyDtoBuilder
 * @see DtoModel
 */
@ObjectType()
export class CompanyDto extends DtoModel implements ICompanyDto {
  @Field(() => String, { name: 'name' })
  public name: string;

  @Field(() => String, { name: 'vatNumber' })
  public vatNumber: string;

  @Field(() => String, { name: 'rcsNumber' })
  public rcsNumber: string;

  @Field(() => String, { name: 'siretNumber' })
  public siretNumber: string;

  @Field(() => String, { name: 'sirenNumber' })
  public sirenNumber: string;

  constructor(company: ICompanyDto) {
    super(company);
    this.name = company.name;
    this.vatNumber = company.vatNumber;
    this.rcsNumber = company.rcsNumber;
    this.siretNumber = company.siretNumber;
    this.sirenNumber = company.sirenNumber;
  }
}
