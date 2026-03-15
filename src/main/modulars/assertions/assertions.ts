import { expect, Locator } from "@playwright/test";
import { logger } from "../../utils/logger/logger";

export class ElementAssertions {
  /**
   * Asserts that the given element is in the given state.
   * Logs an info message if the assertion is successful.
   * Logs an error if the assertion fails.
   * @param {Locator} locator - The locator of the element to be asserted.
   * @param {"visible" | "hidden" | "enabled" | "disabled"} state - The state to be asserted.
   * @param {string} locatorName - The name of the element to be asserted.
   * @param {string} methodName - The name of the calling method.
   */
  public async assertElementState(
    locator: Locator,
    state: "visible" | "hidden" | "enabled" | "disabled",
    locatorName: string,
    methodName: string,
  ): Promise<void> {
    try {
      switch (state) {
        case "visible":
          await expect(locator).toBeVisible();
          break;
        case "hidden":
          await expect(locator).toBeHidden();
          break;
        case "enabled":
          await expect(locator).toBeEnabled();
          break;
        case "disabled":
          await expect(locator).toBeDisabled();
          break;
      }

      logger.info(`${methodName} - ${locatorName} is ${state}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName} - ${locatorName} is not ${state}: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName} - ${locatorName} is not ${state}: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Asserts that the given element property matches the expected value.
   * @param {Locator} locator - The locator of the element whose property is to be asserted.
   * @param {string} locatorName - The name of the element whose property is to be asserted.
   * @param {string} methodName - The name of the calling method.
   * @param {"text" | "value" | "attribute" | "class" | "count"} type - The type of property to be asserted.
   * @param {string | number | RegExp} expected - The expected value of the property.
   * @param {string} [attrName] - The name of the attribute to be asserted, required for type "attribute".
   */
  public async assertElementProperty(
    locator: Locator,
    type: "text" | "value" | "attribute" | "class" | "count",
    expected: string | number | RegExp,
    locatorName: string,
    methodName: string,
    attrName?: string,
  ): Promise<void> {
    try {
      switch (type) {
        case "text":
          await expect(locator).toHaveText(expected as string | RegExp);
          break;
        case "value":
          await expect(locator).toHaveValue(expected as string | RegExp);
          break;
        case "attribute":
          if (!attrName)
            throw new Error(
              "Attribute name must be provided for attribute assertion",
            );
          await expect(locator).toHaveAttribute(
            attrName,
            expected as string | RegExp,
          );
          break;
        case "class":
          await expect(locator).toHaveClass(expected as string);
          break;
        case "count":
          await expect(locator).toHaveCount(expected as number);
          break;
      }

      logger.info(
        `${methodName} - ${locatorName} ${type} matches expected: ${expected}${attrName ? ` for attribute "${attrName}"` : ""}`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName} - ${locatorName} ${type} did not match expected: ${expected}${attrName ? ` for attribute "${attrName}"` : ""} - ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName} - ${locatorName} ${type} did not match expected: ${expected}${attrName ? ` for attribute "${attrName}"` : ""} - ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Asserts that the given element's text matches the given expected value.
   * If type is set to "exact", the assertion will check for an exact match.
   * If type is set to "contains", the assertion will check if the element's text contains the given expected value.
   * Logs an info message if the assertion is successful.
   * Logs an error if the assertion fails.
   * @param {Locator} locator - The locator of the element whose text is to be asserted.
   * @param {string | RegExp} expected - The expected value of the element's text.
   * @param {string} locatorName - The name of the element whose text is to be asserted.
   * @param {string} methodName - The name of the calling method.
   * @param {"exact" | "contains"} type - The type of the assertion. Defaults to "exact".
   */
  public async assertElementText(
    locator: Locator,
    expected: string | RegExp,
    locatorName: string,
    methodName: string,
    type: "exact" | "contains" = "exact",
  ): Promise<void> {
    try {
      if (type === "exact") {
        await expect(locator).toHaveText(expected);
      } else {
        await expect(locator).toContainText(expected);
      }
      logger.info(
        `${methodName} - ${locatorName} text assertion passed: ${expected}`,
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(
        `${methodName} - ${locatorName} text assertion failed: ${expected} - ${message}`,
      );
      throw err;
    }
  }

  /**
   * Asserts that a numeric value is greater than the expected threshold.
   * Logs success or failure.
   * @param {number} actual - The actual numeric value.
   * @param {number} threshold - The threshold to compare against.
   * @param {string} valueName - The name of the value being asserted.
   * @param {string} methodName - The name of the calling method.
   */
  public async assertGreaterThan(
    actual: number,
    threshold: number,
    valueName: string,
    methodName: string,
  ): Promise<void> {
    try {
      expect(actual).toBeGreaterThan(threshold);
      logger.info(
        `${methodName} - ${valueName} (${actual}) is greater than ${threshold}`,
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(
        `${methodName} - ${valueName} (${actual}) is not greater than ${threshold}: ${message}`,
      );
      throw err;
    }
  }

  /**
   * Polls an element's numeric property until it becomes greater than the threshold.
   * Useful for dynamic counters or values that update over time.
   * @param {Locator} locator - The locator of the element.
   * @param {number} threshold - The threshold to compare against.
   * @param {string} locatorName - The name of the element.
   * @param {string} methodName - The name of the calling method.
   * @param {number} timeout - Max time to wait in ms.
   * @param {number} interval - Polling interval in ms.
   */
  public async pollUntilGreaterThan(
    locator: Locator,
    threshold: number,
    locatorName: string,
    methodName: string,
    timeout: number = 5000,
    interval: number = 250,
  ): Promise<void> {
    const start = Date.now();
    try {
      while (Date.now() - start < timeout) {
        const text = await locator.textContent();
        const value = Number(text?.trim());
        if (!isNaN(value) && value > threshold) {
          logger.info(
            `${methodName} - ${locatorName} value (${value}) exceeded ${threshold}`,
          );
          return;
        }
        await new Promise((res) => setTimeout(res, interval));
      }
      throw new Error(
        `${locatorName} did not exceed ${threshold} within ${timeout}ms`,
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(
        `${methodName} - ${locatorName} failed to exceed ${threshold}: ${message}`,
      );
      throw err;
    }
  }

  /**
   * Asserts that a given string variable is not null or empty.
   * Logs success or failure.
   * @param {string | null | undefined} value - The variable to be asserted.
   * @param {string} valueName - The name of the variable being asserted.
   * @param {string} methodName - The name of the calling method.
   */
  public async assertNotNullOrEmptyVar(
    value: string | null | undefined,
    valueName: string,
    methodName: string,
  ): Promise<void> {
    try {
      if (value && value.trim().length > 0) {
        logger.info(
          `${methodName} - ${valueName} is not null or empty: "${value}"`,
        );
      } else {
        throw new Error(`${valueName} is null or empty`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`${methodName} - ${valueName} assertion failed: ${message}`);
      throw err;
    }
  }

  /**
   * Polls until the element's text or value becomes non-empty.
   * Useful for dynamic content that loads asynchronously.
   * @param {Locator} locator - The locator of the element.
   * @param {string} locatorName - The name of the element.
   * @param {string} methodName - The name of the calling method.
   * @param {"text" | "value"} type - Whether to check textContent or value.
   * @param {number} timeout - Max time to wait in ms.
   * @param {number} interval - Polling interval in ms.
   */
  public async pollUntilNotEmpty(
    locator: Locator,
    locatorName: string,
    methodName: string,
    type: "text" | "value" = "text",
    timeout: number = 5000,
    interval: number = 250,
  ): Promise<void> {
    const start = Date.now();
    try {
      while (Date.now() - start < timeout) {
        let content: string | null;
        if (type === "text") {
          content = await locator.textContent();
        } else {
          content = await locator.inputValue();
        }

        if (content && content.trim().length > 0) {
          logger.info(
            `${methodName} - ${locatorName} ${type} became non-empty: "${content}"`,
          );
          return;
        }
        await new Promise((res) => setTimeout(res, interval));
      }
      throw new Error(
        `${locatorName} ${type} did not become non-empty within ${timeout}ms`,
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(
        `${methodName} - ${locatorName} ${type} polling failed: ${message}`,
      );
      throw err;
    }
  }
}
