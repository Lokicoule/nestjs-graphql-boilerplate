import { Criteria } from '@lib/fdo-domain/criteria/criteria';

export interface ICustomerCriteria {
  id?: string;
  authorId?: string;
  code?: string;
  label?: string;
}

@Criteria()
export class CustomerCriteria implements ICustomerCriteria {
  public readonly id?: string;
  public readonly authorId?: string;
  public readonly code?: string;
  public readonly label?: string;

  constructor(data: ICustomerCriteria) {
    this.id = data.id;
    this.authorId = data.authorId;
    this.code = data.code;
    this.label = data.label;
  }
}
