import { DateUtils } from './date.utils';

describe('DateUtils', () => {
  describe('addDays', () => {
    it('should add days to a date', () => {
      const date = new Date('2020-01-01');
      const result = DateUtils.addDays(date, 1);
      expect(result).toEqual(new Date('2020-01-02'));
    });

    it('should add negative days to a date', () => {
      const date = new Date('2020-01-01');
      const result = DateUtils.addDays(date, -1);
      expect(result).toEqual(new Date('2019-12-31'));
    });

    it('should add days to a date with time', () => {
      const date = new Date('2020-01-01T12:00:00');
      const result = DateUtils.addDays(date, 1);
      expect(result).toEqual(new Date('2020-01-02T12:00:00'));
    });
  });
});
