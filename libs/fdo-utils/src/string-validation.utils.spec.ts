import { StringValidationUtils } from './string-validation.utils';

describe('StringValidationUtils', () => {
  describe('isEmail', () => {
    it('should return true if email is valid', () => {
      expect(StringValidationUtils.isEmail('test@email.com')).toBe(true);
    });

    it('should return false if email is invalid', () => {
      expect(StringValidationUtils.isEmail('test')).toBe(false);
    });
  });

  describe('isPhone', () => {
    it('should return true if phone is valid', () => {
      expect(StringValidationUtils.isPhone('0123456789')).toBe(true);
      expect(StringValidationUtils.isPhone('+33123456789')).toBe(true);
      expect(StringValidationUtils.isPhone('0033123456789')).toBe(true);
    });

    it('should return false if phone is invalid', () => {
      expect(StringValidationUtils.isPhone('test')).toBe(false);
    });
  });

  describe('isRCS', () => {
    it('should return true if RCS is valid', () => {
      expect(StringValidationUtils.isRCS('RCS PARIS B 517 403 572')).toBe(true);
      expect(StringValidationUtils.isRCS('RCS MARSEILLE 805 216 439')).toBe(
        true,
      );
    });

    it('should return false if RCS is invalid', () => {
      expect(StringValidationUtils.isRCS('test')).toBe(false);
    });
  });

  describe('isSIRET', () => {
    it('should return true if SIRET is valid', () => {
      expect(StringValidationUtils.isSIRET('12345678912345')).toBe(true);
    });

    it('should return false if SIRET is invalid', () => {
      expect(StringValidationUtils.isSIRET('test')).toBe(false);
    });
  });

  describe('isSIREN', () => {
    it('should return true if SIREN is valid', () => {
      expect(StringValidationUtils.isSIREN('123456789')).toBe(true);
    });

    it('should return false if SIREN is invalid', () => {
      expect(StringValidationUtils.isSIREN('test')).toBe(false);
    });
  });

  describe('isVAT', () => {
    it('should return true if VAT is valid', () => {
      expect(StringValidationUtils.isVAT('FR12345678999')).toBe(true);
    });

    it('should return false if VAT is invalid', () => {
      expect(StringValidationUtils.isVAT('test')).toBe(false);
    });
  });

  describe('isZipCode', () => {
    it('should return true if zip code is valid', () => {
      expect(StringValidationUtils.isZipCode('12345')).toBe(true);
    });

    it('should return false if zip code is invalid', () => {
      expect(StringValidationUtils.isZipCode('test')).toBe(false);
    });
  });
});
