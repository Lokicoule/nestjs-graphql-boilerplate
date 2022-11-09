import { OrderLifeCycleEnumProvider } from './order.enum';

describe('OrderLifeCycleEnum', () => {
  describe('useFactory', () => {
    it('should return the enum value', () => {
      expect(OrderLifeCycleEnumProvider.useFactory('CREATED')).toEqual(
        OrderLifeCycleEnumProvider.useValue.CREATED,
      );
    });

    it('should throw an error', () => {
      expect(() =>
        OrderLifeCycleEnumProvider.useFactory('INVALID'),
      ).toThrowError('Invalid OrderLifeCycleEnum value: INVALID');
    });
  });
});
