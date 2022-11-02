import { TechnicalException } from '@lib/fdo-domain';

export class StringNumberUtils {
  public static incrementAndFormat(value: string, increment = 1): string {
    return this.increment(value, increment).padStart(value.length, '0');
  }

  public static increment(value: string, increment = 1): string {
    const number = Number(value);
    if (isNaN(number)) {
      throw new TechnicalException('Invalid string number');
    }
    return (number + increment).toString();
  }
}
