import { Page, Locator } from "@playwright/test";
import { logger } from "../../utils/logger/logger";

export class KeyboardActions {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Presses a key on the given locator.
   * Waits for the element to be visible, then presses the key.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the element to be pressed on.
   * @param {string} key - The key to be pressed.
   * @param {string} [methodName] - The name of the calling method. Defaults to "Keyboard.press".
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  private async press(
    locator: Locator,
    key: string,
    methodName?: string,
  ): Promise<void> {
    try {
      await locator.press(key);
      logger.info(
        `${methodName ?? "Keyboard.press"} - Pressed key "${key}" on locator`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "Keyboard.press"} - Failed to press key "${key}" on locator: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "Keyboard.press"} - Failed to press key "${key}" on locator: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Presses the Enter key on the given locator.
   * Waits for the element to be visible, then presses the Enter key.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the element to be pressed on.
   * @param {string} methodName - The name of the calling method. Defaults to "Keyboard.pressEnter".
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async pressEnter(
    locator: Locator,
    methodName?: string,
  ): Promise<void> {
    await this.press(locator, "Enter", methodName);
  }

  /**
   * Presses the Tab key on the given locator.
   * Waits for the element to be visible, then presses the Tab key.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the element to be pressed on.
   * @param {string} [methodName] - The name of the calling method. Defaults to "Keyboard.pressTab".
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async pressTab(locator: Locator, methodName?: string): Promise<void> {
    await this.press(locator, "Tab", methodName);
  }

  /**
   * Presses the Escape key on the given locator.
   * Waits for the element to be visible, then presses the Escape key.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the element to be pressed on.
   * @param {string} [methodName] - The name of the calling method. Defaults to "Keyboard.pressEscape".
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async pressEscape(
    locator: Locator,
    methodName?: string,
  ): Promise<void> {
    await this.press(locator, "Escape", methodName);
  }

  /**
   * Presses the Ctrl+A key combination on the given locator.
   * Waits for the element to be visible, then presses the Ctrl+A key combination.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the element to be pressed on.
   * @param {string} [methodName] - The name of the calling method. Defaults to "Keyboard.pressCtrlA".
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async pressCtrlA(
    locator: Locator,
    methodName?: string,
  ): Promise<void> {
    await this.press(locator, "Control+A", methodName);
  }

  /**
   * Presses the Ctrl+C key combination on the given locator.
   * Waits for the element to be visible, then presses the Ctrl+C key combination.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the element to be pressed on.
   * @param {string} [methodName] - The name of the calling method. Defaults to "Keyboard.pressCtrlC".
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async pressCtrlC(
    locator: Locator,
    methodName?: string,
  ): Promise<void> {
    await this.press(locator, "Control+C", methodName);
  }

  /**
   * Presses the Ctrl+V key combination on the given locator.
   * Waits for the element to be visible, then presses the Ctrl+V key combination.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the element to be pressed on.
   * @param {string} [methodName] - The name of the calling method. Defaults to "Keyboard.pressCtrlV".
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async pressCtrlV(
    locator: Locator,
    methodName?: string,
  ): Promise<void> {
    await this.press(locator, "Control+V", methodName);
  }

  /**
   * Presses the Ctrl+X key combination on the given locator.
   * Waits for the element to be visible, then presses the Ctrl+X key combination.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the element to be pressed on.
   * @param {string} [methodName] - The name of the calling method. Defaults to "Keyboard.pressCtrlX".
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async pressCtrlX(
    locator: Locator,
    methodName?: string,
  ): Promise<void> {
    await this.press(locator, "Control+X", methodName);
  }

  /**
   * Presses a key on the page.
   * Waits for the page to be visible, then presses the given key.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {string} key - The key to be pressed.
   * @param {string} [methodName] - The name of the calling method.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async pressKey(key: string, methodName?: string): Promise<void> {
    try {
      await this.page.keyboard.press(key);
      logger.info(
        `${methodName ?? "Keyboard.pressKey"} - Pressed key "${key}" on page`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "Keyboard.pressKey"} - Failed to press key "${key}" on page: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "Keyboard.pressKey"} - Failed to press key "${key}" on page: ${String(err)}`,
        );
      }
      throw err;
    }
  }
}
