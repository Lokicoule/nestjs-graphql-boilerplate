import { PropertyKeyEnumProvider } from './property.enum';

describe('PropertyEnum', () => {
  describe('useFactory', () => {
    it('should return the enum value', () => {
      expect(PropertyKeyEnumProvider.useFactory('COUNTER')).toEqual(
        PropertyKeyEnumProvider.useValue.COUNTER,
      );
    });

    it('should throw an error', () => {
      expect(() => PropertyKeyEnumProvider.useFactory('INVALID')).toThrowError(
        'Invalid PropertyKeyEnum value: INVALID',
      );
    });
  });
});
