import { Locator, expect } from "@playwright/test";
import { logger } from "../../utils/logger/logger";

export class ToggleActions {
  /**
   * Ensures that the given toggle element is checked.
   * If the toggle element is currently unchecked, it will be checked.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the toggle element to be checked.
   * @param {string} [methodName] - The name of the calling method.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async ensureChecked(
    locator: Locator,
    methodName?: string,
  ): Promise<void> {
    try {
      const isChecked = await locator.isChecked();
      if (!isChecked) await locator.check();
      await expect(locator).toBeChecked();
      logger.info(
        `${methodName ?? "Toggle.ensureChecked"} - Toggle is checked`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "Toggle.ensureChecked"} - Failed to ensure toggle is checked: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "Toggle.ensureChecked"} - Failed to ensure toggle is checked: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Ensures that the given toggle element is unchecked.
   * If the toggle element is currently checked, it will be unchecked.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the toggle element to be unchecked.
   * @param {string} [methodName] - The name of the calling method.
   */
  public async ensureUnchecked(
    locator: Locator,
    methodName?: string,
  ): Promise<void> {
    try {
      const isChecked = await locator.isChecked();
      if (isChecked) await locator.uncheck();
      await expect(locator).not.toBeChecked();
      logger.info(
        `${methodName ?? "Toggle.ensureUnchecked"} - Toggle is unchecked`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "Toggle.ensureUnchecked"} - Failed to ensure toggle is unchecked: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "Toggle.ensureUnchecked"} - Failed to ensure toggle is unchecked: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Asserts that the given toggle element is checked.
   * Logs an info message if the assertion is successful.
   * Logs an error if the assertion fails.
   * @param {Locator} locator - The locator of the toggle element to be asserted.
   * @param {string} [methodName] - The name of the calling method.
   */
  public async assertChecked(
    locator: Locator,
    methodName?: string,
  ): Promise<void> {
    try {
      await expect(locator).toBeChecked();
      logger.info(
        `${methodName ?? "Toggle.assertChecked"} - Toggle is checked`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "Toggle.assertChecked"} - Toggle check assertion failed: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "Toggle.assertChecked"} - Toggle check assertion failed: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Asserts that the given toggle element is unchecked.
   * Logs an info message if the assertion is successful.
   * Logs an error if the assertion fails.
   * @param {Locator} locator - The locator of the toggle element to be asserted.
   * @param {string} [methodName] - The name of the calling method.
   */
  public async assertUnchecked(
    locator: Locator,
    methodName?: string,
  ): Promise<void> {
    try {
      await expect(locator).not.toBeChecked();
      logger.info(
        `${methodName ?? "Toggle.assertUnchecked"} - Toggle is unchecked`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "Toggle.assertUnchecked"} - Toggle uncheck assertion failed: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "Toggle.assertUnchecked"} - Toggle uncheck assertion failed: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Toggles the given element.
   * Waits for the element to be visible, then clicks on it.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the element to be toggled.
   * @param {string} [methodName] - The name of the calling method.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async toggle(locator: Locator, methodName?: string): Promise<void> {
    try {
      await locator.click();
      logger.info(`${methodName ?? "Toggle.toggle"} - Toggle clicked`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "Toggle.toggle"} - Failed to toggle: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "Toggle.toggle"} - Failed to toggle: ${String(err)}`,
        );
      }
      throw err;
    }
  }
}
