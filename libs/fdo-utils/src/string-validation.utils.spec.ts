import { StringValidationUtils } from './string-validation.utils';

describe('StringValidationUtils', () => {
  describe('isEmail', () => {
    it('should return true if email is valid', () => {
      expect(StringValidationUtils.isEmail('test@email.com')).toBeTruthy();
    });

    it('should return false if email is invalid', () => {
      expect(StringValidationUtils.isEmail('test')).toBeFalsy();
    });
  });

  describe('isPhone', () => {
    it('should return true if phone is valid', () => {
      expect(StringValidationUtils.isPhone('0123456789')).toBeTruthy();
      expect(StringValidationUtils.isPhone('+33123456789')).toBeTruthy();
    });

    it('should return false if phone is invalid', () => {
      expect(StringValidationUtils.isPhone('test')).toBeFalsy();
    });
  });

  describe('isRCS', () => {
    it('should return true if RCS is valid', () => {
      expect(
        StringValidationUtils.isRCS('RCS PARIS B 517 403 572'),
      ).toBeTruthy();
      expect(
        StringValidationUtils.isRCS('RCS MARSEILLE 805 216 439'),
      ).toBeTruthy();
      expect(
        StringValidationUtils.isRCS('RCS MARSEILLE 805216439'),
      ).toBeTruthy();
    });

    it('should return false if RCS is invalid', () => {
      expect(StringValidationUtils.isRCS('test')).toBeFalsy();
      expect(StringValidationUtils.isRCS('RCS MARSEILLE805216439')).toBeFalsy();
    });
  });

  describe('isSIRET', () => {
    it('should return true if SIRET is valid', () => {
      expect(StringValidationUtils.isSIRET('123 456 789 12345')).toBeTruthy();
    });

    it('should return false if SIRET is invalid', () => {
      expect(StringValidationUtils.isSIRET('test')).toBeFalsy();
    });
  });

  describe('isSIREN', () => {
    it('should return true if SIREN is valid', () => {
      expect(StringValidationUtils.isSIREN('123 456 789')).toBeTruthy();
    });

    it('should return false if SIREN is invalid', () => {
      expect(StringValidationUtils.isSIREN('test')).toBeFalsy();
    });
  });

  describe('isVAT', () => {
    it('should return true if VAT is valid', () => {
      expect(StringValidationUtils.isVAT('FR 12 345678999')).toBeTruthy();
      expect(StringValidationUtils.isVAT('FR 12 345 678 999')).toBeTruthy();
      expect(StringValidationUtils.isVAT('FR 12 345 678999')).toBeTruthy();
      expect(StringValidationUtils.isVAT('FR 12 345678 999')).toBeTruthy();
      expect(StringValidationUtils.isVAT('FR 12345678 999')).toBeTruthy();
      expect(StringValidationUtils.isVAT('FR12345678999')).toBeTruthy();
    });

    it('should return false if VAT is invalid', () => {
      expect(StringValidationUtils.isVAT('test')).toBeFalsy();
    });
  });

  describe('isZipCode', () => {
    it('should return true if zip code is valid', () => {
      expect(StringValidationUtils.isZipCode('12345')).toBeTruthy();
    });

    it('should return false if zip code is invalid', () => {
      expect(StringValidationUtils.isZipCode('test')).toBeFalsy();
    });
  });
});
