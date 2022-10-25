export class AddressUseCase {
  public static validateZipCode(zipCode: string): boolean {
    const zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;
    return zipCodeRegex.test(zipCode);
  }
}
