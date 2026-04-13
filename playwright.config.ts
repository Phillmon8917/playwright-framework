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
  reporter: process.env.CI
    ? [["blob"], ["list"], ["./src/main/report/reporter.ts"]]
    : [["html"], ["list"], ["./src/main/report/reporter.ts"]],
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
      name: "auth-customer",
      use: { ...devices["Desktop Chrome"] },
      testMatch: "**/authentication/customer.auth.ts",
    },
    {
      name: "auth-agent",
      use: { ...devices["Desktop Chrome"] },
      testMatch: "**/authentication/agent.auth.ts",
    },
    {
      name: "auth-admin",
      use: { ...devices["Desktop Chrome"] },
      testMatch: "**/authentication/admin.auth.ts",
    },
    {
      name: "guest",
      use: { ...devices["Desktop Chrome"] },
      grep: /@guest/,
      testIgnore: "**/authentication/**",
    },
    {
      name: "customer",
      dependencies: ["auth-customer"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "storage/customer.json",
      },
      grep: /@customer/,
      testIgnore: "**/authentication/**",
    },
    {
      name: "agent",
      dependencies: ["auth-agent"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "storage/agent.json",
      },
      grep: /@agent/,
      testIgnore: "**/authentication/**",
    },
    {
      name: "admin",
      dependencies: ["auth-admin"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "storage/admin.json",
      },
      grep: /@admin/,
      testIgnore: "**/authentication/**",
    },
  ],
});
