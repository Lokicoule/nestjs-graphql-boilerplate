export class StringValidationUtils {
  public static PATTERNS = {
    EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    PHONE: /^(\+\d{2}|00\d{2}|0)[1-9](\d{2}){4}$/,
    RCS: /^RCS\s[A-Z]+\s([A-Z]\s)?[0-9]{3}\s[0-9]{3}\s[0-9]{3}$/,
    SIRET: /^[0-9]{14}$/,
    SIREN: /^[0-9]{9}$/,
    VAT: /^[A-Z]{2}[0-9]{11}$/,
    ZIP_CODE: /^[0-9]{5}$/,
  };

  public static isEmail(email: string): boolean {
    return email && email.length > 0 && this.PATTERNS.EMAIL.test(email);
  }

  public static isPhone(phone: string): boolean {
    return phone && phone.length > 0 && this.PATTERNS.PHONE.test(phone);
  }

  public static isRCS(rcs: string): boolean {
    return rcs && rcs.length > 0 && this.PATTERNS.RCS.test(rcs);
  }

  public static isSIRET(siret: string): boolean {
    return siret && siret.length > 0 && this.PATTERNS.SIRET.test(siret);
  }

  public static isSIREN(siren: string): boolean {
    return siren && siren.length > 0 && this.PATTERNS.SIREN.test(siren);
  }

  public static isVAT(vat: string): boolean {
    return vat && vat.length > 0 && this.PATTERNS.VAT.test(vat);
  }

  public static isZipCode(zipCode: string): boolean {
    return (
      zipCode && zipCode.length > 0 && this.PATTERNS.ZIP_CODE.test(zipCode)
    );
  }
}
