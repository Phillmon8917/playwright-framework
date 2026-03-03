export class DateUtil {
  
  /**
   * Formats a given date into the specified pattern.
   * Supported tokens:
   * - yyyy : full year
   * - MM   : month number (01–12)
   * - MMM  : short month name (Jan–Dec)
   * - MMMM : full month name (January–December)
   * - dd   : day of month (01–31)
   *
   * @param date - The date to format (defaults to today).
   * @param format - The desired format (default: "dd-MM-yyyy").
   */
  public static getFormattedDate(
    date: Date = new Date(),
    format: string = "dd-MM-yyyy",
  ): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    const monthNamesFull = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthNamesShort = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return format
      .replace("dd", day)
      .replace("MM", month)
      .replace("MMM", monthNamesShort[date.getMonth()])
      .replace("MMMM", monthNamesFull[date.getMonth()])
      .replace("yyyy", year);
  }
}
