export class DateUtils {
  public static get now(): Date {
    return DateUtils.changeTimeZone(new Date(), 'Europe/Paris');
  }

  public static changeTimeZone(date: Date, timeZone: string): Date {
    return new Date(
      date.toLocaleString('fr-FR', {
        timeZone,
      }),
    );
  }

  public static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
