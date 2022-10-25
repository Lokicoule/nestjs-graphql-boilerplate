import { AddressUseCase } from './address.use-case';

describe('AddressUseCase', () => {
  describe('validateZipCode', () => {
    it('zip code contains 5 digits', () => {
      expect(AddressUseCase.validateZipCode('40200')).toBeTruthy();
    });

    it('length of zip code is not 5', () => {
      expect(AddressUseCase.validateZipCode('4020')).toBeFalsy();
      expect(AddressUseCase.validateZipCode('402000')).toBeFalsy();
    });

    it('zip code contains non digit', () => {
      expect(AddressUseCase.validateZipCode('AZEER')).toBeFalsy();
      expect(AddressUseCase.validateZipCode('4020A')).toBeFalsy();
      expect(AddressUseCase.validateZipCode('4020-')).toBeFalsy();
      expect(AddressUseCase.validateZipCode('4020 ')).toBeFalsy();
      expect(AddressUseCase.validateZipCode('40200A')).toBeFalsy();
      expect(AddressUseCase.validateZipCode('40200-')).toBeFalsy();
      expect(AddressUseCase.validateZipCode('40200 ')).toBeFalsy();
    });
  });
});
