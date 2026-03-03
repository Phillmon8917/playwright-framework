import { Locator } from "@playwright/test";
import { logger } from "../../utils/logger/logger";

export class ElementActions {
  /**
   * Clears the given element by filling it with an empty string.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the element to be cleared.
   * @param {string} elementName - The name of the element to be cleared.
   * @param {string} methodName - The name of the calling method.
   */
  public async clearElement(
    locator: Locator,
    elementName: string,
    methodName: string,
  ): Promise<void> {
    try {
      await locator.waitFor({ state: "visible" });
      await locator.click({ force: true });
      await locator.press("Control+A");
      await locator.press("Delete");
      logger.info(`${methodName} - Successfully cleared ${elementName}`);
    } catch (err) {
      if (err instanceof Error) {
        logger.error(
          `${methodName} - Failed to clear ${elementName}: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName} - Failed to clear ${elementName}: ${String(err)}`,
        );
        throw err;
      }
    }
  }

  /**
   * Fills the given element with the given value.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the element to be filled.
   * @param {string} value - The value to be filled in the element.
   * @param {string} locatorName - The name of the element to be filled.
   * @param {string} methodName - The name of the calling method.
   */
  public async fillTheElement(
    locator: Locator,
    value: string,
    locatorName: string,
    methodName: string,
  ): Promise<void> {
    try {
      await locator.waitFor({ state: "visible" });
      await locator.click({ force: true });
      await locator.fill(value);

      logger.info(
        `${methodName} - Successfully filled ${locatorName} with value: ${value}`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName} - Failed to fill ${locatorName}: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName} - Failed to fill ${locatorName}: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Types the given text sequentially into the given locator.
   * Waits for the element to be visible, then clicks on it.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the element to be typed into.
   * @param {string} text - The text to be typed sequentially.
   * @param {string} locatorName - The name of the element to be typed into.
   * @param {string} methodName - The name of the calling method.
   * @param {number} delay - The delay in milliseconds between each character being typed.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async typeSequentially(
    locator: Locator,
    text: string,
    locatorName: string,
    methodName: string,
    delay: number = 100,
  ): Promise<void> {
    try {
      await locator.waitFor({ state: "visible" });
      await locator.click({ force: true });
      await locator.pressSequentially(text, { delay });

      logger.info(
        `${methodName} - Successfully typed sequentially into ${locatorName}`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName} - Failed to type sequentially into ${locatorName}: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName} - Failed to type sequentially into ${locatorName}: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Scrolls the given element into view.
   * Waits for the element to be visible, then scrolls it into view.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the element to be scrolled into view.
   * @param {string} locatorName - The name of the element to be scrolled into view.
   * @param {string} methodName - The name of the calling method.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async scrollIntoView(
    locator: Locator,
    locatorName: string,
    methodName: string,
  ): Promise<void> {
    try {
      await locator.waitFor({ state: "visible" });
      await locator.scrollIntoViewIfNeeded();

      logger.info(
        `${methodName} - Successfully scrolled ${locatorName} into view`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName} - Failed to scroll ${locatorName} into view: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName} - Failed to scroll ${locatorName} into view: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Clicks on the given element.
   * Waits for the element to be visible, then clicks on it.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the element to be clicked.
   * @param {string} locatorName - The name of the element to be clicked.
   * @param {string} methodName - The name of the calling method.
   * @param {("left" | "right" | "double")} clickType - The type of click to be performed.
   */
  public async clickElement(
    locator: Locator,
    locatorName: string,
    methodName: string,
    clickType?: "left" | "right" | "double",
  ): Promise<void> {
    try {
      await locator.scrollIntoViewIfNeeded();
      await locator.waitFor({ state: "visible" });

      if (!clickType) {
        await locator.click({ force: true });
        logger.info(`${methodName} - Successfully clicked ${locatorName}`);
      } else if (clickType === "double") {
        await locator.dblclick();
        logger.info(
          `${methodName} - Successfully double-clicked ${locatorName}`,
        );
      } else {
        await locator.click({ button: clickType });
        logger.info(
          `${methodName} - Successfully ${clickType}-clicked ${locatorName}`,
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          clickType
            ? `${methodName} - Failed to ${clickType}-click ${locatorName}: ${err.message}`
            : `${methodName} - Failed to click ${locatorName}: ${err.message}`,
        );
      } else {
        logger.error(
          clickType
            ? `${methodName} - Failed to ${clickType}-click ${locatorName}: ${String(err)}`
            : `${methodName} - Failed to click ${locatorName}: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Hovers over the given element.
   * Waits for the element to be visible, then hovers over it.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the element to be hovered over.
   * @param {string} locatorName - The name of the element to be hovered over.
   * @param {string} methodName - The name of the calling method.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async hoverElement(
    locator: Locator,
    locatorName: string,
    methodName: string,
  ): Promise<void> {
    try {
      await locator.waitFor({ state: "visible" });
      await locator.hover();

      logger.info(`${methodName} - Successfully hovered over ${locatorName}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName} - Failed to hover over ${locatorName}: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName} - Failed to hover over ${locatorName}: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Focuses on the given element.
   * Waits for the element to be visible, then focuses on it.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the element to be focused.
   * @param {string}locatorName - The name of the element to be focused.
   * @param {string}methodName - The name of the calling method.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async focusElement(
    locator: Locator,
    locatorName: string,
    methodName: string,
  ): Promise<void> {
    try {
      await locator.waitFor({ state: "visible" });
      await locator.focus();

      logger.info(`${methodName} - Successfully focused on ${locatorName}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName} - Failed to focus on ${locatorName}: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName} - Failed to focus on ${locatorName}: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Retrieves the text content of the given element.
   * Waits for the element to be visible, then retrieves its text content.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the element whose text content is to be retrieved.
   * @param {string}locatorName - The name of the element whose text content is to be retrieved.
   * @param {string}methodName - The name of the calling method.
   * @returns {Promise<string | null>} - A promise which resolves with the text content of the element if the operation is successful, and rejects with an error if the operation fails.
   */
  public async getText(
    locator: Locator,
    locatorName: string,
    methodName: string,
  ): Promise<string | null> {
    try {
      await locator.waitFor({ state: "visible" });
      const text = await locator.textContent();

      logger.info(
        `${methodName} - Successfully retrieved text from ${locatorName}`,
      );
      return text;
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName} - Failed to get text from ${locatorName}: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName} - Failed to get text from ${locatorName}: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Retrieves the value of a given attribute from the given element.
   * Waits for the element to be visible, then retrieves the value of the given attribute.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator}locator - The locator of the element whose attribute value is to be retrieved.
   * @param {string}attr - The name of the attribute whose value is to be retrieved.
   * @param {string}locatorName - The name of the element whose attribute value is to be retrieved.
   * @param {string}methodName - The name of the calling method.
   * @returns {Promise<string | null>} - A promise which resolves with the value of the attribute if the operation is successful, and rejects with an error if the operation fails.
   */
  public async getAttribute(
    locator: Locator,
    attr: string,
    locatorName: string,
    methodName: string,
  ): Promise<string | null> {
    try {
      await locator.waitFor({ state: "visible" });
      const value = await locator.getAttribute(attr);

      logger.info(
        `${methodName} - Successfully retrieved attribute "${attr}" from ${locatorName}`,
      );
      return value;
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName} - Failed to get attribute "${attr}" from ${locatorName}: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName} - Failed to get attribute "${attr}" from ${locatorName}: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Retrieves the count of elements that match the given locator.
   * Waits for the elements to be visible, then retrieves their count.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator}locator - The locator of the elements to be counted.
   * @param {string}locatorName - The name of the elements to be counted.
   * @param {string}methodName - The name of the calling method.
   * @returns {Promise<number>} - A promise which resolves with the count of elements if the operation is successful, and rejects with an error if the operation fails.
   */
  public async getCount(
    locator: Locator,
    locatorName: string,
    methodName: string,
  ): Promise<number> {
    try {
      await locator.waitFor({ state: "visible" });
      const count = await locator.count();

      logger.info(
        `${methodName} - Successfully counted ${count} elements for ${locatorName}`,
      );
      return count;
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName} - Failed to count elements for ${locatorName}: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName} - Failed to count elements for ${locatorName}: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Clicks on the given element using JavaScript evaluate.
   * Fires the click event directly on the DOM element via JavaScript.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Locator} locator - The locator of the element to be clicked.
   * @param {string} locatorName - The name of the element to be clicked.
   * @param {string} methodName - The name of the calling method.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async jsClick(
    locator: Locator,
    locatorName: string,
    methodName: string,
  ): Promise<void> {
    try {
      await locator.scrollIntoViewIfNeeded();
      await locator.waitFor({ state: "visible" });
      await locator.evaluate((el) => (el as HTMLElement).click());
      logger.info(`${methodName} - Successfully JS-clicked ${locatorName}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName} - Failed to JS-click ${locatorName}: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName} - Failed to JS-click ${locatorName}: ${String(err)}`,
        );
      }
      throw err;
    }
  }
}
