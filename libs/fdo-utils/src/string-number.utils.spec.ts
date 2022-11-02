import { TechnicalException } from '@lib/fdo-domain';
import { StringNumberUtils } from './string-number.utils';

describe('StringNumberUtils', () => {
  describe('incrementStringNumberWithLeadingZero', () => {
    it('should increment a string number with leading zero', () => {
      const value = '0001';
      const increment = 1;
      const result = StringNumberUtils.incrementAndFormat(value, increment);
      expect(result).toEqual('0002');
    });

    it('should increment a string number without leading zero', () => {
      const value = '1';
      const increment = 1;
      const result = StringNumberUtils.incrementAndFormat(value, increment);
      expect(result).toEqual('2');
    });

    it('should increment a string number with leading zero and increment more than 9', () => {
      const value = '0010';
      const increment = 10;
      const result = StringNumberUtils.incrementAndFormat(value, increment);
      expect(result).toEqual('0020');
    });

    it('should increment a string number with leading zero and increment more than 99', () => {
      const value = '0901';
      const increment = 100;
      const result = StringNumberUtils.incrementAndFormat(value, increment);
      expect(result).toEqual('1001');
    });

    it('should increment a string number with leading zero and increment more than 999', () => {
      const value = '9999';
      const increment = 1;
      const result = StringNumberUtils.incrementAndFormat(value, increment);
      expect(result).toEqual('10000');
    });

    it('invalid string number should throw a TechnicalException', () => {
      const value = 'a';
      const increment = 1;
      expect(() =>
        StringNumberUtils.incrementAndFormat(value, increment),
      ).toThrow(TechnicalException);
    });
  });
});
