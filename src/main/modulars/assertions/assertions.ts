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
}
