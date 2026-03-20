import { defineConfig, devices } from "@playwright/test";


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  globalSetup: "./global-setup.ts",
  timeout: 80 * 1000,
  globalTimeout: 10 * 60 * 1000,
  testDir: "./src/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 3 : undefined,
  reporter: [["html"], ["list"]],
  use: {
    baseURL: "https://phptravels.net/",
    trace: process.env.CI ? "retain-on-failure" : "off",
    headless: !!process.env.CI,
    screenshot: "on",
    video: "retain-on-failure",
    actionTimeout: 80 * 1000,
    navigationTimeout: 120 * 1000,
  },

  projects: [
    {
      name: "PHPTRAVELS Project",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
