import { UserCriteriaBuilder } from './user.criteria.builder';

describe('UserCriteriaBuilder', () => {
  describe('build', () => {
    it('successfully build a User criteria', () => {
      const userCriteria = new UserCriteriaBuilder()
        .withId('1')
        .withEmail('email')
        .build();

      expect(userCriteria._id).toBe('1');
      expect(userCriteria.email).toBe('email');
    });

    it('successfully build a User criteria with undefined properties', () => {
      const userCriteria = new UserCriteriaBuilder().build();

      expect(userCriteria._id).toBeUndefined();
      expect(userCriteria.email).toBeUndefined();
    });
  });

  describe('buildCriteria', () => {
    it('should build a clean object without undefined properties', () => {
      const UserCriteria = new UserCriteriaBuilder()
        .withEmail('email')
        .buildCriteria();
      expect(UserCriteria).toEqual({
        email: 'email',
      });
    });

    it('should build a clean object without undefined properties', () => {
      const UserCriteria = new UserCriteriaBuilder().buildCriteria();
      expect(UserCriteria).toEqual({});
    });
  });
});
