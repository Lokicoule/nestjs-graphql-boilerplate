import { CriteriaBuilder } from './criteria.builder';

describe('CriteriaBuilder', () => {
  describe('buildCriteria', () => {
    it('should build a clean object without undefined properties', () => {
      const testCriteria = new (class TestBuilder extends CriteriaBuilder<{
        id;
        name;
      }> {
        public build(): any {
          return {
            id: undefined,
            name: 'name',
          };
        }
      })().buildCriteria();
      expect(testCriteria).toEqual({
        name: 'name',
      });
    });

    it('should build a clean object without undefined properties', () => {
      const testCriteria = new (class TestBuilder extends CriteriaBuilder<{
        id;
        name;
      }> {
        public build(): any {
          return {
            id: undefined,
            name: undefined,
          };
        }
      })().buildCriteria();
      expect(testCriteria).toEqual({});
    });
  });
});
