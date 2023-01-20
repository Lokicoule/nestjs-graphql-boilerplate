import { Criteria } from '@lib/fdo-domain/criteria/criteria';

export interface ICustomerCriteria {
  id?: string;
  authorId?: string;
  code?: string;
  name?: string;
}

@Criteria()
export class CustomerCriteria implements ICustomerCriteria {
  public readonly id?: string;
  public readonly authorId?: string;
  public readonly code?: string;
  public readonly name?: string;

  constructor(data: ICustomerCriteria) {
    this.id = data.id;
    this.authorId = data.authorId;
    this.code = data.code;
    this.name = data.name;
  }
}
