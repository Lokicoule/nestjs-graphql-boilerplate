import { PropertyEnum } from './property.enum';

describe('PropertyEnum', () => {
  describe('getValue', () => {
    it('should return the enum value', () => {
      expect(PropertyEnum.getValue('COUNTER')).toEqual(
        PropertyEnum.getEnum().COUNTER,
      );
    });

    it('should throw an error', () => {
      expect(() => PropertyEnum.getValue('INVALID')).toThrowError(
        'Invalid PropertyKeyEnum value: INVALID',
      );
    });
  });
});
