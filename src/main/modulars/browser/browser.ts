import { Page, expect } from "@playwright/test";
import { logger } from "../../utils/logger/logger";

export class BrowserActions {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the home page.
   * @param {Page} page - The page to navigate.
   * @returns {Promise<void>}
   */
  public async loadThePage(page: Page): Promise<void> {
    await page.goto("/", { waitUntil: "domcontentloaded" });
  }

  /**
   * Reloads the given page.
   * @param {Page} page - The page to reload.
   * @param {string} [methodName]
   * @returns {Promise<void>}
   */
  public async refresh(page: Page, methodName?: string): Promise<void> {
    try {
      await page.reload();
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
   * Navigates to the given URL on the given page.
   * @param {Page} page - The page to navigate.
   * @param {string} url
   * @param {string} [methodName]
   * @returns {Promise<void>}
   */
  public async navigate(
    page: Page,
    url: string,
    methodName?: string,
  ): Promise<void> {
    try {
      await page.goto(url);
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
   * Retrieves the current URL of the given page.
   * @param {Page} page - The page to get the URL from.
   * @param {string} [methodName]
   * @returns {Promise<string>}
   */
  public async getCurrentUrl(page: Page, methodName?: string): Promise<string> {
    try {
      const url = page.url();
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
   * Retrieves the title of the given page.
   * Waits for the title to become non-empty, up to 25s.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {Page} page - The page to get the title from.
   * @param {string} [methodName] - The name of the calling method.
   * @returns {Promise<string>} - A promise which resolves with the title of the page if the operation is successful, and rejects with an error if the operation fails.
   */
  public async getTitle(page: Page, methodName?: string): Promise<string> {
    try {
      // Poll until document.title is non-empty, up to 25s
      await page.waitForFunction(() => document.title.trim().length > 0, {
        timeout: Number(process.env.LOCAL_TEST_TIMEOUT) || 30_000,
      });

      const title = await page.title();
      logger.info(`${methodName ?? "getTitle"} - Page title is "${title}"`);
      return title;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(
        `${methodName ?? "getTitle"} - Page title did not become non-empty within 25s: ${message}`,
      );
      throw err;
    }
  }

  /**
   * Opens a new tab in the same browser context.
   * @param {string} [methodName]
   * @returns {Promise<Page>}
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
   * @param {Page} page - The page to close.
   * @param {string} [methodName]
   * @returns {Promise<void>}
   */
  public async closeTab(page: Page, methodName?: string): Promise<void> {
    try {
      await page.close();
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
   * Retrieves all open tabs in the current browser context.
   * @param {string} [methodName]
   * @returns {Promise<Page[]>}
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
   * @param {number} index
   * @param {string} [methodName]
   * @returns {Promise<Page>}
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
   * Asserts that the URL of the given page matches the expected URL.
   * @param {Page} page - The page to assert the URL on.
   * @param {string | RegExp} expected
   * @param {string} [methodName]
   * @returns {Promise<void>}
   */
  public async assertUrl(
    page: Page,
    expected: string | RegExp,
    methodName?: string,
  ): Promise<void> {
    try {
      await expect(page).toHaveURL(expected);
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
   * Asserts that the title of the given page matches the expected title.
   * @param {Page} page - The page to assert the title on.
   * @param {string | RegExp} expected
   * @param {string} [methodName]
   * @returns {Promise<void>}
   */
  public async assertTitle(
    page: Page,
    expected: string | RegExp,
    methodName?: string,
  ): Promise<void> {
    try {
      await expect(page).toHaveTitle(expected);
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
   * Waits for the loading indicator to disappear on the given page.
   * @param {Page} page - The page to wait on.
   * @param {string} methodName
   * @returns {Promise<void>}
   */
  public async waitForPageLoaderToDisappear(
    page: Page,
    methodName: string,
  ): Promise<void> {
    const loadingIndicator = page.locator("#page-loader div");
    try {
      if ((await loadingIndicator.count()) > 0) {
        await loadingIndicator
          .first()
          .waitFor({ state: "hidden", timeout: Number(process.env.LOCAL_TEST_TIMEOUT) || 30_000 });
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
   * Waits for the given page to reach a certain state of readiness.
   * @param {Page} page - The page to wait on.
   * @param {"domcontentloaded" | "load" | "networkidle"} [state] - Defaults to "networkidle".
   * @param {string} [methodName]
   * @returns {Promise<void>}
   */
  public async waitForPageReady(
    page: Page,
    state: "domcontentloaded" | "load" | "networkidle" = "networkidle",
    methodName?: string,
  ): Promise<void> {
    try {
      await page.waitForLoadState(state);
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

  /**
   * Waits for a popup event to occur on the given page.
   * @param {Page} page - The page to wait on.
   * @param {string} methodName
   * @returns {Promise<void>}
   */
  public async waitForPopupEvent(
    page: Page,
    methodName: string,
  ): Promise<void> {
    try {
      await page.waitForEvent("popup", { timeout: Number(process.env.LOCAL_TEST_TIMEOUT) || 30_000 });
      logger.info(`${methodName} - Popup event detected within 15s`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName} - Popup event did not occur within 15s: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName} - Popup event did not occur within 15s: ${String(err)}`,
        );
      }
      throw err;
    }
  }
}
