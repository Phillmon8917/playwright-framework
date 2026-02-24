import { Page, expect, Response } from "@playwright/test";
import { logger } from "../../utils/logger/logger";

export class NetworkAssertions {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Asserts that a network request with the given url or regex, and optionally with the given HTTP method, matches the expected status.
   * @param urlOrRegex - The url or regex to match for the request.
   * @param expectedStatus - The expected status code for the response.
   * @param httpMethod - The HTTP method to match for the request. Defaults to any HTTP method.
   * @param requestName - The name of the request to be logged. Defaults to "Request".
   * @param methodName - The name of the calling method. Defaults to "NetworkAssertion".
   * @returns A promise which resolves if the assertion is successful, and rejects if the assertion fails.
   */
  public async assertNetworkRequest(
    urlOrRegex: string | RegExp,
    expectedStatus: number,
    httpMethod?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    requestName?: string,
    methodName?: string,
  ): Promise<void> {
    try {
      const response: Response = await this.page.waitForResponse((resp) => {
        const urlMatch =
          typeof urlOrRegex === "string"
            ? resp.url() === urlOrRegex
            : urlOrRegex.test(resp.url());

        const methodMatch = httpMethod
          ? resp.request().method() === httpMethod
          : true;

        return urlMatch && methodMatch;
      });

      expect(response.status()).toBe(expectedStatus);

      logger.info(
        `${methodName ?? "NetworkAssertion"} - ${requestName ?? "Request"} matched with status ${expectedStatus}` +
          `${httpMethod ? ` and method ${httpMethod}` : ""}`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(
          `${methodName ?? "NetworkAssertion"} - ${requestName ?? "Request"} failed for status ${expectedStatus}` +
            `${httpMethod ? ` and method ${httpMethod}` : ""}: ${err.message}`,
        );
      } else {
        logger.error(
          `${methodName ?? "NetworkAssertion"} - ${requestName ?? "Request"} failed for status ${expectedStatus}` +
            `${httpMethod ? ` and method ${httpMethod}` : ""}: ${String(err)}`,
        );
      }
      throw err;
    }
  }
}
