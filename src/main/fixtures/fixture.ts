import { test as base } from "@playwright/test";
import { HomePage } from "../pages/subPages/home/homePage.ts";
import { SignupPage } from "../pages/subPages/signUp/signUp.ts";
import { LoginPage } from "../pages/subPages/login/login.ts";
import { AIHelper } from "../utils/ai/aiHelper.ts";
import { logger } from "../utils/logger/logger.ts";

export const test = base.extend<{
  homePage: HomePage;
  signupPage: SignupPage;
  loginPage: LoginPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

test.afterEach(async ({ page }, testInfo) => {
  const isCI = process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true";

  if (!isCI) return;

  if (testInfo.status !== testInfo.expectedStatus) {
    try {
      const html = await page.content();

      const aiResults = await AIHelper.analyzeFailure({
        error: testInfo.error?.message || "Unknown error",
        html,
      });

      logger.info("\n🧠 AI FAILURE ANALYSIS");
      logger.info("Test: " + testInfo.title);
      logger.info(aiResults);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error("❌ AI analysis failed: " + message);
    }
  }
});
