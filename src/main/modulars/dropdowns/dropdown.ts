import { Locator, expect } from "@playwright/test";
import { logger } from "../../utils/logger/logger";

export class DropdownActions {
  /**
   * Selects an option by its text from the given dropdown.
   * First tries to select the option using the built-in selectOption method.
   * If that fails, it falls back to clicking on the dropdown and then clicking on the option itself.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the dropdown element.
   * @param {string} text - The text of the option to be selected.
   * @param {string} [methodName] - The name of the calling method.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async selectByText(
    locator: Locator,
    text: string,
    methodName?: string,
  ): Promise<void> {
    try {
      await locator.selectOption({ label: text });
      logger.info(
        `${methodName ?? "Dropdown.selectByText"} - Selected option by text: ${text}`,
      );
    } catch {
      await locator.click();
      const option = locator.page().locator(`text=${text}`);
      await option.click();
      logger.info(
        `${methodName ?? "Dropdown.selectByText"} - Fallback selected custom option by text: ${text}`,
      );
    }
  }

  /**
   * Selects an option by value.
   * @param {Locator} locator - The locator of the dropdown element.
   * @param {string} value - The value of the option to be selected.
   * @param {string} [methodName] - The name of the calling method.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async selectByValue(
    locator: Locator,
    value: string,
    methodName?: string,
  ): Promise<void> {
    try {
      await locator.selectOption({ value });
      logger.info(
        `${methodName ?? "Dropdown.selectByValue"} - Selected option by value: ${value}`,
      );
    } catch {
      await locator.click();
      const option = locator.page().locator(`[data-value="${value}"]`);
      await option.click();
      logger.info(
        `${methodName ?? "Dropdown.selectByValue"} - Fallback selected custom option by value: ${value}`,
      );
    }
  }

  /**
   * Selects an option by index.
   * @param {Locator} locator - The locator of the dropdown element.
   * @param {number} index - The index of the option to be selected.
   * @param {string} [methodName] - The name of the calling method.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the index is out of range.
   */
  public async selectByIndex(
    locator: Locator,
    index: number,
    methodName?: string,
  ): Promise<void> {
    try {
      const options = await locator.locator("option").all();
      if (index < 0 || index >= options.length)
        throw new Error(`Index ${index} out of range`);
      const value = await options[index].getAttribute("value");
      await locator.selectOption({ value: value ?? "" });
      logger.info(
        `${methodName ?? "Dropdown.selectByIndex"} - Selected option at index: ${index}`,
      );
    } catch {
      await locator.click();
      const option = locator
        .page()
        .locator(`li, div[role="option"]`)
        .nth(index);
      await option.click();
      logger.info(
        `${methodName ?? "Dropdown.selectByIndex"} - Fallback selected custom option at index: ${index}`,
      );
    }
  }

  /**
   * Retrieves all the options from the given dropdown locator.
   * If the dropdown is open, it will retrieve the options directly.
   * If the dropdown is closed, it will open the dropdown and then retrieve the options.
   * @param {Locator} locator - The locator of the dropdown element.
   * @param {string} [methodName] - The name of the calling method.
   * @returns {Promise<string[]>} - A promise which resolves with an array of strings representing the options of the dropdown.
   */
  public async getOptions(
    locator: Locator,
    methodName?: string,
  ): Promise<string[]> {
    try {
      const options = await locator.evaluateAll(
        (elements: HTMLOptionElement[]) =>
          elements.map((option) => option.textContent || ""),
      );
      logger.info(
        `${methodName ?? "Dropdown.getOptions"} - Retrieved ${options.length} options`,
      );
      return options;
    } catch {
      await locator.click();
      const options = locator.page().locator('li, div[role="option"]');
      const texts = await options.allTextContents();
      logger.info(
        `${methodName ?? "Dropdown.getOptions"} - Fallback retrieved ${texts.length} custom options`,
      );
      return texts;
    }
  }

  /**
   * Verifies that the given dropdown contains the given option.
   * @param {Locator} locator - The locator of the dropdown element.
   * @param {string} expected - The text of the option to be verified.
   * @param {string} [methodName] - The name of the calling method.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async hasOption(
    locator: Locator,
    expected: string,
    methodName?: string,
  ): Promise<void> {
    const options = await this.getOptions(locator);
    expect(options).toContain(expected);
    logger.info(
      `${methodName ?? "Dropdown.hasOption"} - Verified dropdown contains option: ${expected}`,
    );
  }

  /**
   * Asserts that the given dropdown has the given selected option.
   * If the dropdown uses a standard HTML select element, the assertion will be performed on the selected value.
   * If the dropdown uses a custom implementation, the assertion will be performed on the text content of the selected option.
   * Logs an info message if the assertion is successful.
   * Logs an error if the assertion fails.
   * @param {Locator}locator - The locator of the dropdown whose selected option is to be asserted.
   * @param {string}expected - The expected value of the selected option.
   * @param {string}methodName - The name of the calling method. Defaults to "Dropdown.hasSelectedOption".
   */
  public async hasSelectedOption(
    locator: Locator,
    expected: string,
    methodName?: string,
  ): Promise<void> {
    try {
      await expect(locator).toHaveValue(expected);
      logger.info(
        `${methodName ?? "Dropdown.hasSelectedOption"} - Verified selected option: ${expected}`,
      );
    } catch {
      const selected = locator
        .page()
        .locator('.selected, [aria-selected="true"]');
      await expect(selected).toHaveText(expected);
      logger.info(
        `${methodName ?? "Dropdown.hasSelectedOption"} - Verified custom selected option: ${expected}`,
      );
    }
  }
}
