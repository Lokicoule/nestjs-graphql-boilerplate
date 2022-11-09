export enum OrderLifeCycleEnum {
  CREATED = 'CREATED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  SHIPPED = 'SHIPPED',
}

function useFactory(value: string): OrderLifeCycleEnum {
  switch (value.toUpperCase()) {
    case OrderLifeCycleEnum.CREATED:
      return OrderLifeCycleEnum.CREATED;
    case OrderLifeCycleEnum.CANCELLED:
      return OrderLifeCycleEnum.CANCELLED;
    case OrderLifeCycleEnum.COMPLETED:
      return OrderLifeCycleEnum.COMPLETED;
    case OrderLifeCycleEnum.PENDING:
      return OrderLifeCycleEnum.PENDING;
    case OrderLifeCycleEnum.REJECTED:
      return OrderLifeCycleEnum.REJECTED;
    case OrderLifeCycleEnum.SHIPPED:
      return OrderLifeCycleEnum.SHIPPED;
    default:
      throw new Error(`Invalid OrderLifeCycleEnum value: ${value}`);
  }
}

export const OrderLifeCycleEnumProvider = {
  provide: 'OrderLifeCycleEnum',
  useValue: OrderLifeCycleEnum,
  useFactory,
};
