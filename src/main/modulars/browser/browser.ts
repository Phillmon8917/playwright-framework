import { Locator, Page, expect } from "@playwright/test";
import { logger } from "../../utils/logger/logger";

export class BrowserActions {
  private readonly page: Page;
  private readonly loadingIndicator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loadingIndicator = page.locator("#page-loader div");
  }

  /**
   * Navigates to the home page.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async loadThePage(currentPage: Page): Promise<void> {
    await currentPage.goto("/", { waitUntil: "domcontentloaded" });
  }

  /**
   * Reloads the current page.
   * @param {string} [methodName] - The name of the calling method. Defaults to "refresh".
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async refresh(methodName?: string): Promise<void> {
    try {
      await this.page.reload();
      logger.info(`${methodName ?? "refresh"} - Page reloaded successfully`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "refresh"} - Failed to reload page: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "refresh"} - Failed to reload page: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Navigates to the given URL.
   * @param {string} url - The URL to navigate to.
   * @param {string} [methodName] - The name of the calling method. Defaults to "navigate".
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async navigate(url: string, methodName?: string): Promise<void> {
    try {
      await this.page.goto(url);
      logger.info(
        `${methodName ?? "navigate"} - Successfully navigated to ${url}`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "navigate"} - Failed to navigate to ${url}: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "navigate"} - Failed to navigate to ${url}: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Retrieves the current URL of the page.
   * @param {string} [methodName] - The name of the calling method. Defaults to "getCurrentUrl".
   * @returns {Promise<string>} - A promise which resolves with the current URL of the page if the operation is successful, and rejects with an error if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async getCurrentUrl(methodName?: string): Promise<string> {
    try {
      const url = this.page.url();
      logger.info(`${methodName ?? "getCurrentUrl"} - Current URL is ${url}`);
      return url;
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "getCurrentUrl"} - Failed to get current URL: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "getCurrentUrl"} - Failed to get current URL: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Retrieves the title of the page.
   * @param {string} [methodName] - The name of the calling method. Defaults to "getTitle".
   * @returns {Promise<string>} - A promise which resolves with the title of the page if the operation is successful, and rejects with an error if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async getTitle(methodName?: string): Promise<string> {
    try {
      const title = await this.page.title();
      logger.info(`${methodName ?? "getTitle"} - Page title is "${title}"`);
      return title;
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "getTitle"} - Failed to get page title: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "getTitle"} - Failed to get page title: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Opens a new tab.
   * @param {string} [methodName] - The name of the calling method. Defaults to "newTab".
   * @returns {Promise<Page>} - A promise which resolves with the new page if the operation is successful, and rejects with an error if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async newTab(methodName?: string): Promise<Page> {
    try {
      const newPage = await this.page.context().newPage();
      logger.info(`${methodName ?? "newTab"} - Opened a new tab successfully`);
      return newPage;
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "newTab"} - Failed to open new tab: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "newTab"} - Failed to open new tab: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Closes the given tab.
   * @param {Page} tabPage - The page object of the tab to be closed.
   * @param {string} [methodName] - The name of the calling method. Defaults to "closeTab".
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects with an error if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async closeTab(tabPage: Page, methodName?: string): Promise<void> {
    try {
      await tabPage.close();
      logger.info(`${methodName ?? "closeTab"} - Tab closed successfully`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "closeTab"} - Failed to close tab: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "closeTab"} - Failed to close tab: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Retrieves all open tabs.
   * @param {string} [methodName] - The name of the calling method. Defaults to "getAllTabs".
   * @returns {Promise<Page[]>} - A promise which resolves with an array of Page objects representing all open tabs.
   * @throws {Error} - If the operation fails.
   */
  public async getAllTabs(methodName?: string): Promise<Page[]> {
    try {
      const pages = this.page.context().pages();
      logger.info(
        `${methodName ?? "getAllTabs"} - Retrieved ${pages.length} tabs`,
      );
      return pages;
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "getAllTabs"} - Failed to get tabs: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "getAllTabs"} - Failed to get tabs: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Switches to the tab at the given index.
   * @param {number} index - The index of the tab to switch to.
   * @param {string} [methodName] - The name of the calling method. Defaults to "switchToTab".
   * @returns {Promise<Page>} - A promise which resolves with the Page object of the tab switched to.
   * @throws {Error} - If the tab index is out of range or if the operation fails.
   */
  public async switchToTab(index: number, methodName?: string): Promise<Page> {
    try {
      const pages = this.page.context().pages();

      if (index < 0 || index >= pages.length) {
        throw new Error(`Tab index ${index} out of range`);
      }

      const targetPage = pages[index];
      logger.info(
        `${methodName ?? "switchToTab"} - Switched to tab index ${index}`,
      );
      return targetPage;
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "switchToTab"} - Failed to switch to tab index ${index}: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "switchToTab"} - Failed to switch to tab index ${index}: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Asserts that the current URL of the page matches the given expected URL.
   * Logs an info message if the assertion is successful.
   * Logs an error if the assertion fails.
   * @param {string | RegExp} expected - The expected URL of the page.
   * @param {string} [methodName] - The name of the calling method.
   */
  public async assertUrl(
    expected: string | RegExp,
    methodName?: string,
  ): Promise<void> {
    try {
      await expect(this.page).toHaveURL(expected);
      logger.info(
        `${methodName ?? "assertUrl"} - URL matches expected: ${expected}`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "assertUrl"} - URL did not match expected: ${expected} - ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "assertUrl"} - URL did not match expected: ${expected} - ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Asserts that the title of the page matches the given expected title.
   * Logs an info message if the assertion is successful.
   * Logs an error if the assertion fails.
   * @param {string | RegExp} expected - The expected title of the page.
   * @param {string} [methodName] - The name of the calling method.
   */
  public async assertTitle(
    expected: string | RegExp,
    methodName?: string,
  ): Promise<void> {
    try {
      await expect(this.page).toHaveTitle(expected);
      logger.info(
        `${methodName ?? "assertTitle"} - Page title matches expected: ${expected}`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "assertTitle"} - Page title did not match expected: ${expected} - ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "assertTitle"} - Page title did not match expected: ${expected} - ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Waits for the loading indicator to disappear from the page.
   * Logs an info message when the loading indicator has disappeared.
   * @returns {Promise<void>} - A promise which resolves when the loading indicator has disappeared.
   */
  public async waitForPageLoaderToDisappear(methodName: string): Promise<void> {
    try {
      if ((await this.loadingIndicator.count()) > 0) {
        await this.loadingIndicator
          .first()
          .waitFor({ state: "hidden", timeout: 15000 });
        logger.info(`${methodName} - Loader disappeared (hidden or detached)`);
      } else {
        logger.info(`${methodName} - Loader was not present, continuing`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName} - Loader did not disappear within 15s: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName} - Loader did not disappear within 15s: ${String(err)}`,
        );
      }
      throw err;
    }
  }

  /**
   * Waits for the page to reach a certain state of readiness.
   * Logs an info message when the page has reached the given state.
   * @param {string} state - The state of readiness to wait for. Can be "domcontentloaded", "load", or "networkidle". Defaults to "networkidle".
   * @param {string} [methodName] - The name of the calling method.
   * @returns {Promise<void>} - A promise which resolves when the page has reached the given state.
   * @throws {Error} - If the operation fails.
   */
  public async waitForPageReady(
    state: "domcontentloaded" | "load" | "networkidle" = "networkidle",
    methodName?: string,
  ): Promise<void> {
    try {
      await this.page.waitForLoadState(state);
      logger.info(
        `${methodName ?? "waitForPageReady"} - Page ready with state: ${state}`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "waitForPageReady"} - Failed waiting for page ready (${state}): ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "waitForPageReady"} - Failed waiting for page ready (${state}): ${String(err)}`,
        );
      }
      throw err;
    }
  }
}
