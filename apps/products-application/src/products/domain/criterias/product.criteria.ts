export interface IProductCriteria {
  id?: string;
  cognitoId?: string;
  code?: string;
  label?: string;
}

export class ProductCriteria implements IProductCriteria {
  public readonly _id?: string;
  public readonly cognitoId?: string;
  public readonly code?: string;
  public readonly label?: string;

  constructor(data: IProductCriteria) {
    this._id = data.id;
    this.cognitoId = data.cognitoId;
    this.code = data.code;
    this.label = data.label;
  }
}
