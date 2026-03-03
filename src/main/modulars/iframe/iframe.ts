import { Locator } from "@playwright/test";
import { logger } from "../../utils/logger/logger";

export class IframeActions {
  
  /**
   * Fills the given element with the given text in the iframe.
   * Waits for the element to be visible, then fills it with the given text.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} frameLocator - The locator of the iframe element.
   * @param {string} selector - The selector of the element to be filled.
   * @param {string} text - The text to be filled in the element.
   * @param {string} [methodName] - The name of the calling method.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async fillTheElement(
    frameLocator: Locator,
    selector: string,
    text: string,
    methodName?: string,
  ): Promise<void> {
    try {
      const frame = await frameLocator
        .elementHandle()
        .then((el) => el?.contentFrame());
      if (!frame)
        throw new Error("Could not get frame from the provided locator");

      await frame.fill(selector, text);
      logger.info(
        `${methodName ?? "Iframe.fill"} - Filled "${selector}" in iframe with text: ${text}`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "Iframe.fill"} - Failed to fill "${selector}" in iframe: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "Iframe.fill"} - Failed to fill "${selector}" in iframe: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Clicks on the given element inside the iframe.
   * Waits for the element to be visible, then clicks on it.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} frameLocator - The locator of the iframe element.
   * @param {string} selector - The selector of the element to be clicked.
   * @param {string} [methodName] - The name of the calling method.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async clickTheElement(
    frameLocator: Locator,
    selector: string,
    methodName?: string,
  ): Promise<void> {
    try {
      const frame = await frameLocator
        .elementHandle()
        .then((el) => el?.contentFrame());
      if (!frame)
        throw new Error("Could not get frame from the provided locator");

      await frame.click(selector);
      logger.info(
        `${methodName ?? "Iframe.click"} - Clicked "${selector}" inside iframe`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "Iframe.click"} - Failed to click "${selector}" inside iframe: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "Iframe.click"} - Failed to click "${selector}" inside iframe: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Retrieves the text content of the given element inside the iframe.
   * Waits for the element to be visible, then retrieves its text content.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} frameLocator - The locator of the iframe element.
   * @param {string} selector - The selector of the element whose text content is to be retrieved.
   * @param {string} [methodName] - The name of the calling method.
   * @returns {Promise<string | null>} - A promise which resolves with the text content of the element if the operation is successful, and rejects with an error if the operation fails.
   */
  public async getText(
    frameLocator: Locator,
    selector: string,
    methodName?: string,
  ): Promise<string | null> {
    try {
      const frame = await frameLocator
        .elementHandle()
        .then((el) => el?.contentFrame());
      if (!frame)
        throw new Error("Could not get frame from the provided locator");

      const text = await frame.textContent(selector);
      logger.info(
        `${methodName ?? "Iframe.getText"} - Got text from "${selector}" inside iframe: ${text}`,
      );
      return text;
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "Iframe.getText"} - Failed to get text from "${selector}" inside iframe: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "Iframe.getText"} - Failed to get text from "${selector}" inside iframe: ${String(err)}`,
        );
      }
      throw err;
    }
  }
}
