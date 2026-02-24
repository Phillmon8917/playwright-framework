import { Page, Locator} from "@playwright/test";
import { DateOption } from "../calendar/calenderNavigator.type";
import { logger } from "../../utils/logger/logger";

export class CalendarNavigator {
  private readonly page: Page;
  private readonly currentSwitch: Locator;

  constructor(page: Page) {
    this.page = page;
    this.currentSwitch = page.locator(".datepicker-days .switch");
  }

  /**
   * Selects a date in the given calendar.
   * First clicks on the input field to open the calendar.
   * Then, it ensures that the correct year is selected by clicking on the correct year button.
   * Next, it ensures that the correct month is selected by clicking on the correct month button.
   * Finally, it ensures that the correct day is selected by clicking on the correct day button.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} inputLocator - The locator of the input field to be clicked.
   * @param {DateOption} dateOption - The date to be selected.
   * @param {string} locatorName - The name of the input field to be clicked.
   * @param {string} [methodName] - The name of the calling method.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async selectDate(
    dateOption: DateOption,
    locatorName: string,
    methodName?: string,
  ): Promise<void> {
    try {
      const { day, month, year } = dateOption;

      const targetDay = day.toString();
      const targetYear = year.toString();

      await this.ensureCorrectYear(targetYear);
      await this.ensureCorrectMonth(month);
      await this.ensureCorrectDay(targetDay);

      logger.info(
        `${methodName ?? "Calendar.selectDate"} - Successfully selected ${day} ${month} ${year} on ${locatorName}`,
      );
    } catch (err: unknown) {
      logger.error(
        `${methodName ?? "Calendar.selectDate"} - Failed selecting ${dateOption.day} ${dateOption.month} ${dateOption.year} on ${locatorName}: ${
          err instanceof Error ? err.message : String(err)
        }`,
      );
      throw err;
    }
  }

  /**
   * Ensures that the given year is selected on the calendar.
   * If the currently selected year matches the given year, this function does nothing.
   * If the currently selected year does not match the given year, this function will click on the year with the given text content.
   * @param {string} year - The text content of the year to be selected.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  private async ensureCorrectYear(year: string): Promise<void> {
    const currentText = await this.currentSwitch.textContent();

    if (!currentText?.includes(year)) {
      await this.currentSwitch.click({ force: true });
      await this.currentSwitch.click({ force: true });
      await this.page.locator(`.year:text("${year}")`).click({ force: true });
    }
  }

  /**
   * Ensures that the month is correctly set on the calendar.
   * If the month does not match the current month on the calendar,
   * it will be clicked to switch to the correct month.
   * @param {string} month - The month to be set on the calendar.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  private async ensureCorrectMonth(month: string): Promise<void> {
    const currentSwitch = this.page.locator(".datepicker-days .switch");
    const currentText = await currentSwitch.textContent();

    if (!currentText?.includes(month.slice(0, 3))) {
      await this.page.locator(`.month:text("${month.slice(0, 3)}")`).click();
    }
  }

  /**
   * Ensures that the correct day is selected on the calendar.
   * If the currently selected day matches the given day, this function does nothing.
   * If the currently selected day does not match the given day, this function will click on the day with the given text content.
   * @param {string} day - The text content of the day to be selected.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  private async ensureCorrectDay(day: string): Promise<void> {
    const selectedDay = this.page.locator(
      `.day.active:not(.old):not(.new):not(.disabled)`,
    );

    if (await selectedDay.count()) {
      const selectedText = await selectedDay.first().textContent();

      if (selectedText?.trim() === day) {
        return;
      }
    }

    const dayLocator = this.page
      .locator(`.day:not(.old):not(.new):not(.disabled)`)
      .filter({ hasText: day });

    await dayLocator.first().click();
  }
}
