import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  globalSetup: "./global-setup.ts",
  timeout: Number(process.env.TEST_TIMEOUT) || 80_000,
  globalTimeout: Number(process.env.GLOBAL_TIMEOUT) || 600_000,
  testDir: "./src/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 3 : undefined,
  reporter: [["html"], ["list"], ["./src/main/report/reporter.ts"]],
  use: {
    baseURL: process.env.BASE_URL || "https://phptravels.net/",
    trace: process.env.CI ? "retain-on-failure" : "off",
    headless: !!process.env.CI,
    screenshot: "on",
    video: "retain-on-failure",
    actionTimeout: Number(process.env.ACTION_TIMEOUT) || 80_000,
    navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT) || 120_000,
  },
  projects: [
    {
      name: "PHPTRAVELS Project",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
