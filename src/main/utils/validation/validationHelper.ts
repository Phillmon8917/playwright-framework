import { Page } from "@playwright/test";

export class ValidationHelper {
/**
 * Retrieves the validation message for the given field.
 * If the field has a native validation message, it will be returned.
 * If the field does not have a native validation message, it will search for an error tooltip or error message element adjacent to the field element and return its text content.
 * If no error element is found, an empty string will be returned.
 *
 * @param {Page} page - The page object.
 * @param {string} fieldId - The id of the field element.
 * @returns {Promise<string>} - A promise which resolves with the validation message.
 */
  public static async getValidationMessage(
    page: Page,
    fieldId: string,
  ): Promise<string> {
    const nativeMessage = await page.$eval(
      `#${fieldId}`,
      (el: HTMLInputElement) => el.validationMessage,
    );

    if (nativeMessage && nativeMessage.trim().length > 0) {
      return nativeMessage.trim();
    }

    const errorLocator = page.locator(
      `#${fieldId} ~ .error-tooltip, #${fieldId} ~ .error-message`,
    );
    if ((await errorLocator.count()) > 0) {
      return (await errorLocator.first().innerText()).trim();
    }

    return "";
  }
}
